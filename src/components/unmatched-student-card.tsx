
"use client";

import { useEffect, useState } from "react";
import type { Student } from "@/lib/definitions";
import { generateSkillGapFeedback } from "@/ai/flows/generate-skill-gap-feedback";
import { companies } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "./ui/skeleton";
import { User, Lightbulb, BrainCircuit } from "lucide-react";

interface UnmatchedStudentCardProps {
  student: Student;
}

export default function UnmatchedStudentCard({ student }: UnmatchedStudentCardProps) {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const companyRequirements = companies.map(c => `${c.title}: ${c.req}`).join('\n');
        const result = await generateSkillGapFeedback({
          studentSkills: student.skills,
          companyRequirements: companyRequirements,
        });
        setFeedback(result.feedback);
      } catch (error) {
        console.error("Error generating feedback:", error);
        setFeedback("Could not generate feedback for this student.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, [student]);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" /> {student.name}
                </CardTitle>
                <CardDescription>{student.location}</CardDescription>
            </div>
             <Badge
                variant={
                    student.category === "GEN" ? "secondary" : "outline"
                }
                >
                {student.category}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between space-y-4">
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <BrainCircuit className="h-4 w-4" />
            Current Skills
          </h4>
          <div className="flex flex-wrap gap-1">
            {student.skills.split(", ").map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <Lightbulb className="h-4 w-4" />
            AI Feedback
          </h4>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              &ldquo;{feedback}&rdquo;
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

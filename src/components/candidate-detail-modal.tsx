"use client";

import { useEffect, useState } from "react";
import type { MatchResult, Company, Student } from "@/lib/definitions";
import { generateMatchReason } from "@/ai/flows/generate-match-reason";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "./ui/skeleton";
import { Award, Building, User, BrainCircuit, Star } from "lucide-react";

interface CandidateDetailModalProps {
  match: MatchResult | null;
  company: Company | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function CandidateDetailModal({
  match,
  company,
  isOpen,
  onOpenChange,
}: CandidateDetailModalProps) {
  const [reason, setReason] = useState("");
  const [isLoadingReason, setIsLoadingReason] = useState(false);

  useEffect(() => {
    if (isOpen && match && company) {
      const fetchReason = async () => {
        setIsLoadingReason(true);
        try {
          const result = await generateMatchReason({
            studentName: match.student.name,
            studentSkills: match.student.skills,
            studentCategory: match.student.category,
            companyName: company.name,
            companySkills: company.req,
            cosineSimilarity: match.cosineSimilarity,
            jaccardSimilarity: match.jaccardSimilarity,
            fairnessBoost: match.fairnessBoost,
          });
          setReason(result.reason);
        } catch (error) {
          console.error("Error generating match reason:", error);
          setReason("Could not generate a reason for this match.");
        } finally {
          setIsLoadingReason(false);
        }
      };
      fetchReason();
    } else {
      setReason("");
    }
  }, [isOpen, match, company]);

  if (!match || !company) return null;

  const { student } = match;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{student.name}</DialogTitle>
          <DialogDescription>
            Detailed match analysis for {company.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <User className="h-5 w-5" /> Candidate Info
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <strong>Category:</strong>
                  <Badge
                    variant={
                      student.category === "GEN" ? "secondary" : "outline"
                    }
                  >
                    {student.category}
                  </Badge>
                </div>
                <p>
                  <strong>Location:</strong> {student.location}
                </p>
                <p>
                  <strong>Sector Preference:</strong> {student.sector}
                </p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <BrainCircuit className="h-5 w-5" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {student.skills.split(", ").map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
             <div>
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <Building className="h-5 w-5" /> Allocation
              </h3>
               <p className="text-sm">
                  <strong>Company:</strong> {company.name}
               </p>
               <p className="text-sm text-muted-foreground">
                  {company.title}
               </p>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-6 rounded-lg bg-secondary/50 p-4">
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <Star className="h-5 w-5" /> Score Breakdown
              </h3>
              <div className="space-y-3">
                 <div className="flex justify-between items-baseline">
                    <span className="font-medium text-muted-foreground">Final Score</span>
                    <span className="font-mono text-xl font-bold text-primary">{match.finalScore.toFixed(3)}</span>
                 </div>
                 <Separator />
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cosine Similarity</span>
                    <span className="font-mono">{match.cosineSimilarity.toFixed(3)}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Jaccard Similarity</span>
                    <span className="font-mono">{match.jaccardSimilarity.toFixed(3)}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fairness Boost</span>
                    <span className={`font-mono ${match.fairnessBoost > 0 ? 'text-accent' : ''}`}>{match.fairnessBoost.toFixed(3)}</span>
                 </div>
              </div>
            </div>
             <Separator />
            <div>
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                    Reason for Match
                </h3>
                {isLoadingReason ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground italic">
                        &ldquo;{reason}&rdquo;
                    </p>
                )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

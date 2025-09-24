import { useState } from "react";
import type { AlgorithmResult, MatchResult, Company, Student } from "@/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { Award, BarChart3, ShieldCheck, XCircle } from "lucide-react";
import CandidateDetailModal from "./candidate-detail-modal";
import UnmatchedStudentCard from "./unmatched-student-card";

interface ResultsDisplayProps {
  result: AlgorithmResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { shortlists, summary, unmatchedStudents } = result;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleRowClick = (match: MatchResult, company: Company) => {
    setSelectedMatch(match);
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-8">
        <Card className="bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6" />
              <CardTitle>AI Matching Results</CardTitle>
            </div>
            <CardDescription>
              Generated assignments and fairness metrics from the AI engine.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="font-semibold">SC/ST/PwD Representation</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {summary.scStPwdPercentage.toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  of matched candidates
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="font-semibold">Rural Representation</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {summary.ruralPercentage.toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  of matched candidates
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {shortlists.map((shortlist) => (
            <Card key={shortlist.company.id}>
              <CardHeader>
                <CardTitle>{shortlist.company.name}</CardTitle>
                <CardDescription>{shortlist.company.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shortlist.matches.length > 0 ? (
                      shortlist.matches.map((match, index) => (
                        <TableRow
                          key={match.student.id}
                          className="cursor-pointer"
                          onClick={() =>
                            handleRowClick(match, shortlist.company)
                          }
                        >
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <div>{match.student.name}</div>
                            {match.fairnessBoost > 0 && (
                              <Badge
                                variant="default"
                                className="mt-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                              >
                                <Award className="mr-1 h-3 w-3" />
                                Fairness Boost
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-mono">
                            {match.finalScore.toFixed(3)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          No candidates matched.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>

        {unmatchedStudents && unmatchedStudents.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <XCircle className="h-6 w-6 text-destructive" />
                <CardTitle>Unmatched Candidates</CardTitle>
              </div>
              <CardDescription>
                These candidates were not assigned an internship. AI-powered feedback is provided below.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {unmatchedStudents.map((student) => (
                <UnmatchedStudentCard key={student.id} student={student} />
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <CandidateDetailModal
        match={selectedMatch}
        company={selectedCompany}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}

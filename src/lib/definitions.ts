export interface Student {
  id: string;
  name: string;
  skills: string;
  category: 'GEN' | 'SC' | 'ST' | 'PwD' | 'OBC';
  location: string;
  sector: string;
  isRural: boolean;
}

export interface Company {
  id: string;
  name: string;
  title: string;
  req: string;
  sector: string;
  location: string;
  capacity: number;
}

export interface MatchResult {
  student: Student;
  company: Company;
  cosineSimilarity: number;
  jaccardSimilarity: number;
  fairnessBoost: number;
  finalScore: number;
}

export interface CompanyShortlist {
  company: Company;
  matches: MatchResult[];
}

export interface SummaryMetrics {
  totalShortlisted: number;
  scStPwdShortlisted: number;
  ruralShortlisted: number;
  scStPwdPercentage: number;
  ruralPercentage: number;
}

export interface AlgorithmResult {
  shortlists: CompanyShortlist[];
  summary: SummaryMetrics;
}

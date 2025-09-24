import type { Student, Company, MatchResult, CompanyShortlist, SummaryMetrics, AlgorithmResult } from './definitions';

// --- Helper Functions ---

const tokenize = (text: string): string[] => {
  return text.toLowerCase().split(/[\s,]+/).filter(Boolean);
};

const getSkillSet = (text: string): Set<string> => {
  return new Set(tokenize(text));
};

// --- Similarity Calculations ---

const calculateJaccardSimilarity = (setA: Set<string>, setB: Set<string>): number => {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
};

const calculateCosineSimilarity = (
  studentSkills: string,
  companyReq: string,
  corpus: string[],
  idf: Map<string, number>
): number => {
  const vocabulary = Array.from(idf.keys());
  
  const getTfIdfVector = (text: string): number[] => {
    const tokens = tokenize(text);
    if (tokens.length === 0) return new Array(vocabulary.length).fill(0);

    const tf = new Map<string, number>();
    tokens.forEach(token => {
      tf.set(token, (tf.get(token) || 0) + 1);
    });
    tokens.forEach(token => {
      tf.set(token, tf.get(token)! / tokens.length);
    });

    return vocabulary.map(term => (tf.get(term) || 0) * (idf.get(term) || 0));
  };
  
  const vecA = getTfIdfVector(studentSkills);
  const vecB = getTfIdfVector(companyReq);
  
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);
  
  if (magA === 0 || magB === 0) return 0;
  
  return dotProduct / (magA * magB);
};


// --- Main Algorithm ---

export function runMatchingAlgorithm(students: Student[], companies: Company[]): AlgorithmResult {
  const allSkillsDocs = [...students.map(s => s.skills), ...companies.map(c => c.req)];
  const allTokens = new Set(allSkillsDocs.flatMap(tokenize));
  
  const idf = new Map<string, number>();
  allTokens.forEach(token => {
    const docsWithToken = allSkillsDocs.filter(doc => tokenize(doc).includes(token)).length;
    idf.set(token, Math.log(allSkillsDocs.length / (1 + docsWithToken)));
  });

  const allPossibleMatches: MatchResult[] = [];
  students.forEach(student => {
    companies.forEach(company => {
      const studentSkillSet = getSkillSet(student.skills);
      const companySkillSet = getSkillSet(company.req);
      
      const jaccardSimilarity = calculateJaccardSimilarity(studentSkillSet, companySkillSet);
      const cosineSimilarity = calculateCosineSimilarity(student.skills, company.req, allSkillsDocs, idf);
      
      const fairnessBoost = (['SC', 'ST', 'PwD'].includes(student.category) || student.isRural) ? 0.1 : 0;
      
      const finalScore = (0.6 * cosineSimilarity) + (0.3 * jaccardSimilarity) + fairnessBoost;

      allPossibleMatches.push({
        student,
        company,
        cosineSimilarity,
        jaccardSimilarity,
        fairnessBoost,
        finalScore
      });
    });
  });

  // Sort all possible matches by final score in descending order
  allPossibleMatches.sort((a, b) => b.finalScore - a.finalScore);

  const matchedStudentIds = new Set<string>();
  const companyAssignments: { [companyId: string]: MatchResult[] } = {};
  companies.forEach(c => companyAssignments[c.id] = []);

  for (const match of allPossibleMatches) {
    const { student, company } = match;
    if (!matchedStudentIds.has(student.id) && companyAssignments[company.id].length < company.capacity) {
      companyAssignments[company.id].push(match);
      matchedStudentIds.add(student.id);
    }
  }

  const shortlists: CompanyShortlist[] = companies.map(company => ({
    company,
    matches: companyAssignments[company.id].sort((a, b) => b.finalScore - a.finalScore),
  }));

  const unmatchedStudents = students.filter(s => !matchedStudentIds.has(s.id));
  
  const matchedStudents = students.filter(s => matchedStudentIds.has(s.id));
  const scStPwdShortlisted = matchedStudents.filter(s => ['SC', 'ST', 'PwD'].includes(s.category)).length;
  const ruralShortlisted = matchedStudents.filter(s => s.isRural).length;
  const totalShortlisted = matchedStudents.length;

  const summary: SummaryMetrics = {
    totalShortlisted,
    scStPwdShortlisted,
    ruralShortlisted,
    scStPwdPercentage: totalShortlisted > 0 ? (scStPwdShortlisted / totalShortlisted) * 100 : 0,
    ruralPercentage: totalShortlisted > 0 ? (ruralShortlisted / totalShortlisted) * 100 : 0,
  };

  return { shortlists, summary, unmatchedStudents };
}

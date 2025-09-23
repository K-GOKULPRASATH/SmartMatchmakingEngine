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

  const shortlists: CompanyShortlist[] = [];
  let totalShortlisted = 0;
  let scStPwdShortlisted = 0;
  let ruralShortlisted = 0;

  companies.forEach(company => {
    const companySkillSet = getSkillSet(company.req);
    const allMatches: MatchResult[] = [];

    students.forEach(student => {
      const studentSkillSet = getSkillSet(student.skills);
      
      const jaccardSimilarity = calculateJaccardSimilarity(studentSkillSet, companySkillSet);
      const cosineSimilarity = calculateCosineSimilarity(student.skills, company.req, allSkillsDocs, idf);
      
      const fairnessBoost = (['SC', 'ST', 'PwD'].includes(student.category) || student.isRural) ? 0.1 : 0;
      
      const finalScore = (0.6 * cosineSimilarity) + (0.3 * jaccardSimilarity) + fairnessBoost;

      allMatches.push({
        student,
        company,
        cosineSimilarity,
        jaccardSimilarity,
        fairnessBoost,
        finalScore
      });
    });

    allMatches.sort((a, b) => b.finalScore - a.finalScore);
    const shortlistSize = company.capacity * 3; // Shortlist 3x capacity
    const topMatches = allMatches.slice(0, shortlistSize);
    
    shortlists.push({
      company,
      matches: topMatches,
    });

    topMatches.forEach(match => {
        totalShortlisted++;
        if (['SC', 'ST', 'PwD'].includes(match.student.category)) {
            scStPwdShortlisted++;
        }
        if (match.student.isRural) {
            ruralShortlisted++;
        }
    });
  });
  
  const summary: SummaryMetrics = {
    totalShortlisted,
    scStPwdShortlisted,
    ruralShortlisted,
    scStPwdPercentage: totalShortlisted > 0 ? (scStPwdShortlisted / totalShortlisted) * 100 : 0,
    ruralPercentage: totalShortlisted > 0 ? (ruralShortlisted / totalShortlisted) * 100 : 0,
  };

  return { shortlists, summary };
}

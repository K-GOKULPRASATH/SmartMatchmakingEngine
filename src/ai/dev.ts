import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-fairness-metrics.ts';
import '@/ai/flows/generate-internship-title.ts';
import '@/ai/flows/generate-skills-suggestions.ts';
import '@/ai/flows/generate-match-reason.ts';
import '@/ai/flows/generate-skill-gap-feedback.ts';

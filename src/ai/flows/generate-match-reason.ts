'use server';

/**
 * @fileOverview A flow to generate a text explanation for why a student was matched with a company.
 *
 * - generateMatchReason - A function that generates the match reason.
 * - GenerateMatchReasonInput - The input type for the generateMatchReason function.
 * - GenerateMatchReasonOutput - The return type for the generateMatchReason function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMatchReasonInputSchema = z.object({
  studentName: z.string().describe("The student's name."),
  studentSkills: z.string().describe("The student's skills."),
  studentCategory: z.string().describe("The student's social category (e.g., GEN, SC, ST, PwD)."),
  companyName: z.string().describe("The company's name."),
  companySkills: z.string().describe('The skills required by the company.'),
  cosineSimilarity: z
    .number()
    .describe('The cosine similarity score between student and company skills.'),
  jaccardSimilarity: z
    .number()
    .describe('The Jaccard similarity score between student and company skills.'),
  fairnessBoost: z
    .number()
    .describe('The fairness boost applied to the score.'),
});
export type GenerateMatchReasonInput = z.infer<
  typeof GenerateMatchReasonInputSchema
>;

const GenerateMatchReasonOutputSchema = z.object({
  reason: z
    .string()
    .describe('A text explanation for the match, summarizing the scores.'),
});
export type GenerateMatchReasonOutput = z.infer<
  typeof GenerateMatchReasonOutputSchema
>;

export async function generateMatchReason(
  input: GenerateMatchReasonInput
): Promise<GenerateMatchReasonOutput> {
  return generateMatchReasonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMatchReasonPrompt',
  input: {schema: GenerateMatchReasonInputSchema},
  output: {schema: GenerateMatchReasonOutputSchema},
  prompt: `You are an expert HR analyst. Provide a concise, one-sentence explanation for why a student is a good match for an internship.

Student Name: {{{studentName}}}
Student Skills: {{{studentSkills}}}
Student Category: {{{studentCategory}}}
Company Name: {{{companyName}}}
Required Skills: {{{companySkills}}}
Cosine Similarity: {{{cosineSimilarity}}}
Jaccard Similarity: {{{jaccardSimilarity}}}
Fairness Boost: {{#if fairnessBoost}}Applied ({{fairnessBoost}}){{else}}Not Applied{{/if}}

Based on the data, generate a summary. For example: "The candidate's skills have a strong overlap with the required skills (Cosine: {{cosineSimilarity}}, Jaccard: {{jaccardSimilarity}}), and a fairness boost was applied for the {{studentCategory}} category."
`,
});

const generateMatchReasonFlow = ai.defineFlow(
  {
    name: 'generateMatchReasonFlow',
    inputSchema: GenerateMatchReasonInputSchema,
    outputSchema: GenerateMatchReasonOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

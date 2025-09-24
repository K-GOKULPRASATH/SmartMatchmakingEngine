'use server';

/**
 * @fileOverview A flow to generate feedback for unmatched students, highlighting skill gaps.
 *
 * - generateSkillGapFeedback - A function that generates feedback.
 * - GenerateSkillGapFeedbackInput - The input type for the generateSkillGapFeedback function.
 * - GenerateSkillGapFeedbackOutput - The return type for the generateSkillGapFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSkillGapFeedbackInputSchema = z.object({
  studentSkills: z.string().describe("A comma-separated list of the student's skills."),
  companyRequirements: z.string().describe('A summary of all available companies and their required skills.'),
});
export type GenerateSkillGapFeedbackInput = z.infer<
  typeof GenerateSkillGapFeedbackInputSchema
>;

const GenerateSkillGapFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe('Constructive feedback for the student, suggesting 2-3 specific skills to learn to improve their chances next time.'),
});
export type GenerateSkillGapFeedbackOutput = z.infer<
  typeof GenerateSkillGapFeedbackOutputSchema
>;

export async function generateSkillGapFeedback(
  input: GenerateSkillGapFeedbackInput
): Promise<GenerateSkillGapFeedbackOutput> {
  return generateSkillGapFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSkillGapFeedbackPrompt',
  input: {schema: GenerateSkillGapFeedbackInputSchema},
  output: {schema: GenerateSkillGapFeedbackOutputSchema},
  prompt: `You are an expert career advisor providing feedback to a student who was not matched with an internship.
Your goal is to provide encouraging and constructive feedback.

Analyze the student's skills and compare them against the required skills for all available internships.
Identify the key skills the student is missing for the available roles.
Suggest 2-3 specific skills the student could learn to be a stronger candidate in the future. Keep the feedback concise and to one sentence.

Student's Skills:
{{{studentSkills}}}

Available Internship Requirements:
{{{companyRequirements}}}

Example feedback: "To better align with available roles, consider learning Data Science and Tableau to complement your existing Python and SQL skills."
`,
});

const generateSkillGapFeedbackFlow = ai.defineFlow(
  {
    name: 'generateSkillGapFeedbackFlow',
    inputSchema: GenerateSkillGapFeedbackInputSchema,
    outputSchema: GenerateSkillGapFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

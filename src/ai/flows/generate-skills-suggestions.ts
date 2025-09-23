'use server';

/**
 * @fileOverview A flow to generate student skills suggestions based on the internship description.
 *
 * - generateSkillsSuggestions - A function that generates skills suggestions.
 * - GenerateSkillsSuggestionsInput - The input type for the generateSkillsSuggestions function.
 * - GenerateSkillsSuggestionsOutput - The return type for the generateSkillsSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSkillsSuggestionsInputSchema = z.object({
  internshipDescription: z
    .string()
    .describe('The description of the internship provided by the company.'),
});
export type GenerateSkillsSuggestionsInput = z.infer<
  typeof GenerateSkillsSuggestionsInputSchema
>;

const GenerateSkillsSuggestionsOutputSchema = z.object({
  skillsSuggestions: z
    .string()
    .describe('Suggested skills for the student based on the internship description.'),
});
export type GenerateSkillsSuggestionsOutput = z.infer<
  typeof GenerateSkillsSuggestionsOutputSchema
>;

export async function generateSkillsSuggestions(
  input: GenerateSkillsSuggestionsInput
): Promise<GenerateSkillsSuggestionsOutput> {
  return generateSkillsSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSkillsSuggestionsPrompt',
  input: {schema: GenerateSkillsSuggestionsInputSchema},
  output: {schema: GenerateSkillsSuggestionsOutputSchema},
  prompt: `You are an expert career counselor. Based on the following internship description, suggest a list of skills that a student should have to be successful in this internship. Return a comma separated list of skills. 

Internship Description: {{{internshipDescription}}}`,
});

const generateSkillsSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSkillsSuggestionsFlow',
    inputSchema: GenerateSkillsSuggestionsInputSchema,
    outputSchema: GenerateSkillsSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

// src/ai/flows/generate-internship-title.ts
'use server';

/**
 * @fileOverview Generates internship title suggestions based on a given description.
 *
 * - generateInternshipTitle - A function that generates internship titles.
 * - GenerateInternshipTitleInput - The input type for the generateInternshipTitle function.
 * - GenerateInternshipTitleOutput - The return type for the generateInternshipTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInternshipTitleInputSchema = z.object({
  description: z
    .string()
    .describe('A brief description of the internship role and responsibilities.'),
});
export type GenerateInternshipTitleInput = z.infer<
  typeof GenerateInternshipTitleInputSchema
>;

const GenerateInternshipTitleOutputSchema = z.object({
  title: z
    .string()
    .describe('A suggested title for the internship based on the description.'),
});
export type GenerateInternshipTitleOutput = z.infer<
  typeof GenerateInternshipTitleOutputSchema
>;

export async function generateInternshipTitle(
  input: GenerateInternshipTitleInput
): Promise<GenerateInternshipTitleOutput> {
  return generateInternshipTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInternshipTitlePrompt',
  input: {schema: GenerateInternshipTitleInputSchema},
  output: {schema: GenerateInternshipTitleOutputSchema},
  prompt: `You are an expert at creating compelling internship titles. Based on the following description, suggest an appropriate internship title. 

Description: {{{description}}}`,
});

const generateInternshipTitleFlow = ai.defineFlow(
  {
    name: 'generateInternshipTitleFlow',
    inputSchema: GenerateInternshipTitleInputSchema,
    outputSchema: GenerateInternshipTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview A flow to summarize the fairness metrics of internship allocations.
 *
 * - summarizeFairnessMetrics - A function that takes fairness metrics as input and returns a text summary.
 * - SummarizeFairnessMetricsInput - The input type for the summarizeFairnessMetrics function.
 * - SummarizeFairnessMetricsOutput - The return type for the summarizeFairnessMetrics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFairnessMetricsInputSchema = z.object({
  scStPwdShortlistedPercentage: z
    .number()
    .describe('The percentage of shortlisted candidates from SC/ST/PwD categories.'),
  ruralRepresentationPercentage: z
    .number()
    .describe('The percentage of shortlisted candidates from rural areas.'),
});
export type SummarizeFairnessMetricsInput = z.infer<
  typeof SummarizeFairnessMetricsInputSchema
>;

const SummarizeFairnessMetricsOutputSchema = z.object({
  summary: z.string().describe('A text summary of the fairness metrics.'),
});
export type SummarizeFairnessMetricsOutput = z.infer<
  typeof SummarizeFairnessMetricsOutputSchema
>;

export async function summarizeFairnessMetrics(
  input: SummarizeFairnessMetricsInput
): Promise<SummarizeFairnessMetricsOutput> {
  return summarizeFairnessMetricsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeFairnessMetricsPrompt',
  input: {schema: SummarizeFairnessMetricsInputSchema},
  output: {schema: SummarizeFairnessMetricsOutputSchema},
  prompt: `You are an AI assistant that summarizes fairness metrics for an internship allocation program.

  Based on the following metrics, provide a concise summary of the fairness of the internship allocations, including key statistics and their implications. Highlight any areas where fairness could be improved.

  SC/ST/PwD Shortlisted Percentage: {{scStPwdShortlistedPercentage}}%
  Rural Representation Percentage: {{ruralRepresentationPercentage}}%`,
});

const summarizeFairnessMetricsFlow = ai.defineFlow(
  {
    name: 'summarizeFairnessMetricsFlow',
    inputSchema: SummarizeFairnessMetricsInputSchema,
    outputSchema: SummarizeFairnessMetricsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

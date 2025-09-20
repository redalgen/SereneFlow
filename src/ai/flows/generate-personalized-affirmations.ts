// src/ai/flows/generate-personalized-affirmations.ts
'use server';

/**
 * @fileOverview Generates personalized affirmations based on user mood and goals.
 *
 * - generateAffirmation - A function that generates personalized affirmations.
 * - GenerateAffirmationInput - The input type for the generateAffirmation function.
 * - GenerateAffirmationOutput - The return type for the generateAffirmation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAffirmationInputSchema = z.object({
  mood: z
    .string()
    .describe('The current mood of the user (e.g., happy, sad, anxious).'),
  goals: z
    .string()
    .describe('The goals the user is currently pursuing.'),
});
export type GenerateAffirmationInput = z.infer<typeof GenerateAffirmationInputSchema>;

const GenerateAffirmationOutputSchema = z.object({
  affirmation: z.string().describe('A personalized and encouraging affirmation.'),
});
export type GenerateAffirmationOutput = z.infer<typeof GenerateAffirmationOutputSchema>;

export async function generateAffirmation(
  input: GenerateAffirmationInput
): Promise<GenerateAffirmationOutput> {
  return generateAffirmationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAffirmationPrompt',
  input: {schema: GenerateAffirmationInputSchema},
  output: {schema: GenerateAffirmationOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized and encouraging affirmations for users.

  Based on the user's current mood and goals, generate a single affirmation that will help them feel more encouraged and motivated.

  Mood: {{{mood}}}
  Goals: {{{goals}}}
  Affirmation:`,
});

const generateAffirmationFlow = ai.defineFlow(
  {
    name: 'generateAffirmationFlow',
    inputSchema: GenerateAffirmationInputSchema,
    outputSchema: GenerateAffirmationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

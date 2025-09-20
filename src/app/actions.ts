'use server';

import {
  generateAffirmation,
  GenerateAffirmationInput,
  GenerateAffirmationOutput,
} from '@/ai/flows/generate-personalized-affirmations';
import { z } from 'zod';

const ActionInputSchema = z.object({
  mood: z.string().min(1, 'Please share your current mood.'),
  goals: z.string().min(1, 'Please describe your goals.'),
});

type ActionState = {
  formErrors?: { mood?: string[], goals?: string[] };
  affirmation?: string;
  error?: string;
};

export async function getAffirmationAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawInput = {
    mood: formData.get('mood'),
    goals: formData.get('goals'),
  };

  const validationResult = ActionInputSchema.safeParse(rawInput);

  if (!validationResult.success) {
    return {
      formErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const input: GenerateAffirmationInput = validationResult.data;

  try {
    const result: GenerateAffirmationOutput = await generateAffirmation(input);
    return { affirmation: result.affirmation };
  } catch (e: any) {
    console.error(e);
    return { error: 'Failed to generate affirmation. Please try again later.' };
  }
}

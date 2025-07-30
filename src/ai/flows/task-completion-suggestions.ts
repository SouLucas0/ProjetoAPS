'use server';

/**
 * @fileOverview An AI agent for providing task completion suggestions based on past history.
 * 
 * - getTaskCompletionSuggestions - A function that returns AI-generated suggestions for improving task completion.
 * - TaskCompletionSuggestionsInput - The input type for the getTaskCompletionSuggestions function.
 * - TaskCompletionSuggestionsOutput - The return type for the getTaskCompletionSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskCompletionSuggestionsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  taskHistory: z.string().describe('The student\'s task history in JSON format.'),
});
export type TaskCompletionSuggestionsInput = z.infer<typeof TaskCompletionSuggestionsInputSchema>;

const TaskCompletionSuggestionsOutputSchema = z.object({
  suggestions: z.string().describe('AI-generated suggestions for improving task completion based on past history.'),
});
export type TaskCompletionSuggestionsOutput = z.infer<typeof TaskCompletionSuggestionsOutputSchema>;

export async function getTaskCompletionSuggestions(input: TaskCompletionSuggestionsInput): Promise<TaskCompletionSuggestionsOutput> {
  return taskCompletionSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'taskCompletionSuggestionsPrompt',
  input: {schema: TaskCompletionSuggestionsInputSchema},
  output: {schema: TaskCompletionSuggestionsOutputSchema},
  prompt: `You are an AI task coach providing suggestions to students for improving task completion based on their past history.

  Analyze the student\'s task history and provide personalized suggestions for improving task completion.

  Task History: {{{taskHistory}}}

  Suggestions:`,
});

const taskCompletionSuggestionsFlow = ai.defineFlow(
  {
    name: 'taskCompletionSuggestionsFlow',
    inputSchema: TaskCompletionSuggestionsInputSchema,
    outputSchema: TaskCompletionSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

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
  studentId: z.string().describe('O ID do estudante.'),
  taskHistory: z.string().describe('O histórico de tarefas do estudante em formato JSON.'),
});
export type TaskCompletionSuggestionsInput = z.infer<typeof TaskCompletionSuggestionsInputSchema>;

const TaskCompletionSuggestionsOutputSchema = z.object({
  suggestions: z.string().describe('Sugestões geradas por IA para melhorar a conclusão de tarefas com base no histórico passado.'),
});
export type TaskCompletionSuggestionsOutput = z.infer<typeof TaskCompletionSuggestionsOutputSchema>;

export async function getTaskCompletionSuggestions(input: TaskCompletionSuggestionsInput): Promise<TaskCompletionSuggestionsOutput> {
  return taskCompletionSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'taskCompletionSuggestionsPrompt',
  input: {schema: TaskCompletionSuggestionsInputSchema},
  output: {schema: TaskCompletionSuggestionsOutputSchema},
  prompt: `Você é um coach de tarefas de IA que fornece sugestões a estudantes para melhorar a conclusão de tarefas com base em seu histórico passado.

  Analise o histórico de tarefas do estudante e forneça sugestões personalizadas para melhorar a conclusão das tarefas. Responda em Português do Brasil.

  Histórico de Tarefas: {{{taskHistory}}}

  Sugestões:`,
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

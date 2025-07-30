'use client';

import { useEffect, useState } from 'react';
import { getTaskCompletionSuggestions } from '@/ai/flows/task-completion-suggestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from '@/hooks/use-tasks';

export function AiCoachCard() {
  const { tasks } = useTasks();
  const [suggestions, setSuggestions] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const taskHistory = JSON.stringify(
    tasks.filter((t) => t.status === 'concluida')
  );

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getTaskCompletionSuggestions({
        studentId: 'student-01',
        taskHistory,
      });
      if (result.suggestions) {
        setSuggestions(result.suggestions);
      } else {
        setError('Não foi possível obter sugestões no momento.');
      }
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao buscar sugestões.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch suggestions if there is some completed task history
    if (JSON.parse(taskHistory).length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions("Conclua algumas tarefas para obter sugestões personalizadas do seu coach de IA!");
      setLoading(false);
    }
  }, [taskHistory]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-destructive-foreground/80">
          <p>{error}</p>
          <Button variant="secondary" size="sm" onClick={fetchSuggestions} className="mt-4">
            Tentar Novamente
          </Button>
        </div>
      );
    }
    
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={suggestions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-sm whitespace-pre-wrap font-light text-foreground/90 dark:text-foreground/80"
        >
          {suggestions}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-primary/70 via-accent to-secondary dark:from-primary/30 dark:via-accent dark:to-background border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2 text-foreground dark:text-primary-foreground">
          <Lightbulb />
          Coach de Tarefas IA
        </CardTitle>
      </CardHeader>
      <CardContent>
          {renderContent()}
          <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={fetchSuggestions} disabled={loading}>
            <Zap className="mr-2 h-4 w-4" />
            {loading ? 'Gerando...' : 'Gerar Novas Sugestões'}
          </Button>
      </CardContent>
    </Card>
  );
}

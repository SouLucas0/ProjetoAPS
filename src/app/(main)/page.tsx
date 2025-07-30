'use client';

import { useTasks } from '@/hooks/use-tasks';
import { TaskList } from '@/components/task-list';
import { AiCoachCard } from '@/components/ai-coach-card';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';
import { AddTask } from '@/components/add-task';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { tasks } = useTasks();

  const { pendingTasks, completedTasks } = useMemo(() => {
    const pending = tasks.filter((t) => t.status === 'pendente');
    const completed = tasks.filter((t) => t.status === 'concluida');
    return { pendingTasks: pending.length, completedTasks: completed.length };
  }, [tasks]);

  return (
    <>
      <PageHeader
        title="Bem-vindo de volta, Karol!"
        description="Aqui está o que você tem para hoje."
      >
        <AddTask />
      </PageHeader>
      <div className="space-y-6">
        <TaskList />
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Progresso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                    <span className="font-medium">Tarefas Pendentes</span>
                  </div>
                  <span className="font-bold text-2xl text-primary">{pendingTasks}</span>
                </div>
                 <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span className="font-medium">Tarefas Concluídas</span>
                  </div>
                  <span className="font-bold text-2xl text-green-500">{completedTasks}</span>
                </div>
              </CardContent>
            </Card>
            <AiCoachCard />
        </div>
      </div>
    </>
  );
}

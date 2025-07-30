import { MOCK_TASKS } from '@/lib/mock-data';
import { TaskList } from '@/components/task-list';
import { AiCoachCard } from '@/components/ai-coach-card';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';
import { AddTask } from '@/components/add-task';

export default function DashboardPage() {
  const pendingTasks = MOCK_TASKS.filter(t => t.status === 'pendente').length;
  const completedTasks = MOCK_TASKS.length - pendingTasks;

  return (
    <>
      <PageHeader
        title="Bem-vindo de volta, Lucas!"
        description="Aqui está o que você tem para hoje."
      >
        <AddTask />
      </PageHeader>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <TaskList initialTasks={MOCK_TASKS} />
        </div>
        <div className="lg:col-span-1 space-y-6">
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
          <AiCoachCard tasks={MOCK_TASKS} />
        </div>
      </div>
    </>
  );
}

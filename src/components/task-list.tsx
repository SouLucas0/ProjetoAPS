'use client';

import { useState, useMemo } from 'react';
import { add, format, isBefore, isToday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, ArrowRight, Calendar, CheckCircle2, Circle, Flame } from 'lucide-react';

const priorityIcons = {
  high: <Flame className="h-4 w-4 text-red-500" />,
  medium: <AlertCircle className="h-4 w-4 text-yellow-500" />,
  low: <Circle className="h-4 w-4 text-green-500" />,
};

const priorityText = {
  high: 'Prioridade Alta',
  medium: 'Prioridade Média',
  low: 'Prioridade Baixa',
};

const priorityBadgeVariant = {
  high: 'destructive',
  medium: 'secondary',
  low: 'default',
} as const;

const priorityDisplayText = {
  high: 'Alta',
  medium: 'Média',
  low: 'Baixa',
};

export function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { toast } = useToast();

  const handleTaskCompletion = (taskId: string, isCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: isCompleted ? 'completed' : 'pending',
              completionDate: isCompleted ? new Date().toISOString() : undefined,
            }
          : task
      )
    );

    if (isCompleted) {
      const task = tasks.find(t => t.id === taskId);
      toast({
        title: 'Tarefa Concluída!',
        description: `Parabéns por terminar "${task?.title}"!`,
        action: (
          <div className="p-2 rounded-full bg-green-500/20">
             <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
        ),
      });
    }
  };

  const pendingTasks = useMemo(
    () => tasks
        .filter((task) => task.status === 'pending')
        .sort((a, b) => parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime()),
    [tasks]
  );
  
  const groupedTasks = useMemo(() => {
    const today = new Date();
    const tomorrow = add(today, { days: 1 });

    const overdue = pendingTasks.filter(task => isBefore(parseISO(task.dueDate), today) && !isToday(parseISO(task.dueDate)));
    const dueToday = pendingTasks.filter(task => isToday(parseISO(task.dueDate)));
    const dueTomorrow = pendingTasks.filter(task => isToday(parseISO(task.dueDate)) || new Date(task.dueDate).toDateString() === tomorrow.toDateString());
    const upcoming = pendingTasks.filter(task => !overdue.includes(task) && !dueToday.includes(task) && !dueTomorrow.includes(task));
    
    return [
      { title: 'Atrasadas', tasks: overdue, icon: <AlertCircle className="text-destructive"/> },
      { title: 'Para Hoje', tasks: dueToday, icon: <ArrowRight className="text-primary"/> },
      { title: 'Para Amanhã', tasks: dueTomorrow, icon: <Calendar className="text-muted-foreground"/> },
      { title: 'Próximas', tasks: upcoming, icon: <Calendar className="text-muted-foreground"/> }
    ].filter(group => group.tasks.length > 0);

  }, [pendingTasks]);
  
  return (
    <div className="space-y-6">
      <AnimatePresence>
        {groupedTasks.map((group) => (
          <motion.div
            key={group.title}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  {group.icon}
                  {group.title}
                  <Badge variant="outline" className="ml-2">{group.tasks.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'flex items-start gap-4 p-4 rounded-lg border transition-all',
                        task.status === 'completed'
                          ? 'bg-muted/50'
                          : 'bg-card hover:bg-muted/50'
                      )}
                    >
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.status === 'completed'}
                        onCheckedChange={(checked) =>
                          handleTaskCompletion(task.id, !!checked)
                        }
                        className="mt-1"
                      />
                      <div className="grid gap-1.5 flex-1">
                        <label
                          htmlFor={`task-${task.id}`}
                          className={cn(
                            'font-medium transition-all',
                            task.status === 'completed' &&
                              'line-through text-muted-foreground'
                          )}
                        >
                          {task.title}
                        </label>
                        <p className={cn('text-sm text-muted-foreground', task.status === 'completed' && 'line-through')}>
                          {task.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-2" title={priorityText[task.priority]}>
                            {priorityIcons[task.priority]}
                            <Badge variant={priorityBadgeVariant[task.priority]}>{priorityDisplayText[task.priority]}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{format(parseISO(task.dueDate), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      {pendingTasks.length === 0 && (
        <Card className="text-center p-8 border-dashed">
          <CardContent className="flex flex-col items-center gap-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h3 className="font-headline text-2xl">Todas as tarefas concluídas!</h3>
            <p className="text-muted-foreground">
              Você está em dia. Hora de um merecido descanso!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { add, format, isBefore, isToday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Tarefa } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, ArrowRight, Calendar, CheckCircle2, Circle, Flame, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { TaskForm } from './task-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';


const priorityIcons = {
  alta: <Flame className="h-4 w-4 text-red-500" />,
  media: <AlertCircle className="h-4 w-4 text-yellow-500" />,
  baixa: <Circle className="h-4 w-4 text-green-500" />,
};

const priorityText = {
  alta: 'Prioridade Alta',
  media: 'Prioridade Média',
  baixa: 'Prioridade Baixa',
};

const priorityBadgeVariant = {
  alta: 'destructive',
  media: 'secondary',
  baixa: 'default',
} as const;

const priorityDisplayText = {
  alta: 'Alta',
  media: 'Média',
  baixa: 'Baixa',
};

export function TaskList({ initialTasks }: { initialTasks: Tarefa[] }) {
  const [tasks, setTasks] = useState<Tarefa[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<Tarefa | null>(null);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleTaskCompletion = (taskId: string, isCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: isCompleted ? 'concluida' : 'pendente',
              dataConclusao: isCompleted ? new Date().toISOString() : undefined,
            }
          : task
      )
    );

    if (isCompleted) {
      const task = tasks.find(t => t.id === taskId);
      toast({
        title: 'Tarefa Concluída!',
        description: `Parabéns por terminar "${task?.titulo}"!`,
        action: (
          <div className="p-2 rounded-full bg-green-500/20">
             <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
        ),
      });
    }
  };

  const handleEditTask = (task: Tarefa) => {
    setEditingTask(task);
    setSheetOpen(true);
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: 'Tarefa Excluída',
      variant: 'destructive',
    });
  }

  const handleFormSubmit = (taskData: Omit<Tarefa, 'id' | 'status'>) => {
    if (editingTask) {
      // Edit
      setTasks(tasks.map(task => task.id === editingTask.id ? { ...editingTask, ...taskData } : task));
      toast({ title: 'Tarefa atualizada com sucesso!'});
    } else {
      // Add
      const newTask: Tarefa = {
        id: (tasks.length + 1).toString(),
        ...taskData,
        status: 'pendente',
      };
      setTasks([...tasks, newTask]);
      toast({ title: 'Tarefa adicionada com sucesso!'});
    }
    setSheetOpen(false);
    setEditingTask(null);
  }

  const pendingTasks = useMemo(
    () => tasks
        .filter((task) => task.status === 'pendente')
        .sort((a, b) => parseISO(a.dataEntrega).getTime() - parseISO(b.dataEntrega).getTime()),
    [tasks]
  );
  
  const groupedTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = add(today, { days: 1 });

    const overdue = pendingTasks.filter(task => isBefore(parseISO(task.dataEntrega), today));
    const dueToday = pendingTasks.filter(task => isToday(parseISO(task.dataEntrega)));
    const dueTomorrow = pendingTasks.filter(task => new Date(task.dataEntrega).toDateString() === tomorrow.toDateString());
    const upcoming = pendingTasks.filter(task => !overdue.includes(task) && !dueToday.includes(task) && !dueTomorrow.includes(task));
    
    return [
      { title: 'Atrasadas', tasks: overdue, icon: <AlertCircle className="text-destructive"/> },
      { title: 'Para Hoje', tasks: dueToday, icon: <ArrowRight className="text-primary"/> },
      { title: 'Para Amanhã', tasks: dueTomorrow, icon: <Calendar className="text-muted-foreground"/> },
      { title: 'Próximas', tasks: upcoming, icon: <Calendar className="text-muted-foreground"/> }
    ].filter(group => group.tasks.length > 0);

  }, [pendingTasks]);
  
  return (
    <>
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
                          task.status === 'concluida'
                            ? 'bg-muted/50'
                            : 'bg-card hover:bg-muted/50'
                        )}
                      >
                        <Checkbox
                          id={`task-${task.id}`}
                          checked={task.status === 'concluida'}
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
                              task.status === 'concluida' &&
                                'line-through text-muted-foreground'
                            )}
                          >
                            {task.titulo}
                          </label>
                          <p className={cn('text-sm text-muted-foreground', task.status === 'concluida' && 'line-through')}>
                            {task.descricao}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-2" title={priorityText[task.prioridade]}>
                              {priorityIcons[task.prioridade]}
                              <Badge variant={priorityBadgeVariant[task.prioridade]}>{priorityDisplayText[task.prioridade]}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{format(parseISO(task.dataEntrega), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded-md hover:bg-muted">
                              <MoreVertical className="h-5 w-5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleEditTask(task)}>
                              <Pencil className="mr-2 h-4 w-4"/>
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4"/>
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
      <Sheet open={isSheetOpen} onOpenChange={(open) => {
        setSheetOpen(open);
        if (!open) setEditingTask(null);
      }}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingTask ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}</SheetTitle>
          </SheetHeader>
          <TaskForm 
            onSubmit={handleFormSubmit} 
            defaultValues={editingTask} 
            onCancel={() => {
              setSheetOpen(false);
              setEditingTask(null);
            }} 
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

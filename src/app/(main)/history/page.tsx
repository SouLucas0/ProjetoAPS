'use client';

import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTasks } from '@/hooks/use-tasks';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Flame, AlertCircle, Circle, Trophy, BarChart2, Undo2 } from 'lucide-react';
import { type Tarefa } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

const priorityIcons = {
  alta: <Flame className="h-4 w-4" />,
  media: <AlertCircle className="h-4 w-4" />,
  baixa: <Circle className="h-4 w-4" />,
};


export default function HistoryPage() {
  const { tasks, updateTask } = useTasks();
  const { toast } = useToast();

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === 'concluida').sort((a, b) => parseISO(b.dataConclusao!).getTime() - parseISO(a.dataConclusao!).getTime()),
    [tasks]
  );

  const totalCompleted = completedTasks.length;

  const priorities = useMemo(() => {
    return completedTasks.reduce((acc, task) => {
        acc[task.prioridade] = (acc[task.prioridade] || 0) + 1;
        return acc;
    }, {} as Record<Tarefa['prioridade'], number>);
  }, [completedTasks])

  const handleUncompleteTask = (task: Tarefa) => {
    updateTask(task.id, {
        ...task,
        status: 'pendente',
        dataConclusao: undefined,
    });
    toast({
        title: "Tarefa Restaurada!",
        description: `A tarefa "${task.titulo}" foi movida de volta para o painel.`,
    })
  }

  return (
    <>
      <PageHeader
        title="Histórico de Tarefas"
        description="Consulte suas tarefas concluídas e veja suas métricas de produtividade."
      />
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Tarefas Concluídas
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompleted}</div>
              <p className="text-xs text-muted-foreground">
                Parabéns pelo seu progresso!
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conclusões por Prioridade
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">{priorityIcons.alta} Alta</span>
                    <span className="font-bold">{priorities.alta || 0}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">{priorityIcons.media} Média</span>
                    <span className="font-bold">{priorities.media || 0}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">{priorityIcons.baixa} Baixa</span>
                    <span className="font-bold">{priorities.baixa || 0}</span>
                </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tarefas Concluídas</CardTitle>
            <CardDescription>
              Uma lista de todas as tarefas que você já finalizou.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarefa</TableHead>
                  <TableHead className="text-center">Prioridade</TableHead>
                  <TableHead>Data de Entrega</TableHead>
                  <TableHead>Data de Conclusão</TableHead>
                   <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedTasks.length > 0 ? (
                  completedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div className="font-medium">{task.titulo}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {task.descricao}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={priorityBadgeVariant[task.prioridade]}
                          className="capitalize"
                        >
                          {priorityDisplayText[task.prioridade]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(parseISO(task.dataEntrega), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>
                        {task.dataConclusao
                          ? format(parseISO(task.dataConclusao), 'dd/MM/yyyy')
                          : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleUncompleteTask(task)} title="Desconcluir tarefa">
                           <Undo2 className="h-4 w-4"/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center"
                    >
                      Nenhuma tarefa concluída ainda.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

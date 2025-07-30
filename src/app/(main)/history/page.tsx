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
import { MOCK_TASKS } from '@/lib/mock-data';
import { format, parseISO } from 'date-fns';
import { type Tarefa } from '@/lib/types';
import { CheckCircle2 } from 'lucide-react';
import { ptBR } from 'date-fns/locale';

export default function HistoryPage() {
  const completedTasks = MOCK_TASKS.filter(
    (task) => task.status === 'concluida'
  ).sort((a,b) => parseISO(b.dataConclusao!).getTime() - parseISO(a.dataConclusao!).getTime());

  const priorityBadgeVariant = {
    alta: 'destructive',
    media: 'secondary',
    baixa: 'default',
  } as const;

  const priorityText = {
    alta: 'Alta',
    media: 'Média',
    baixa: 'Baixa',
  };

  return (
    <>
      <PageHeader
        title="Histórico de Tarefas"
        description="Um registro de todas as suas tarefas concluídas."
      />
      <Card>
        <CardHeader>
          <CardTitle>Tarefas Concluídas</CardTitle>
          <CardDescription>
            Você concluiu {completedTasks.length} tarefas. Continue o ótimo
            trabalho!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarefa</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Data de Entrega</TableHead>
                <TableHead>Data de Conclusão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedTasks.length > 0 ? (
                completedTasks.map((task: Tarefa) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.titulo}</TableCell>
                    <TableCell>
                      <Badge variant={priorityBadgeVariant[task.prioridade]}>
                        {priorityText[task.prioridade]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(parseISO(task.dataEntrega), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      {task.dataConclusao
                        ? format(parseISO(task.dataConclusao), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Ainda não há tarefas concluídas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {completedTasks.length === 0 && (
         <Card className="mt-6 text-center p-8 border-dashed">
          <CardContent className="flex flex-col items-center gap-4">
            <CheckCircle2 className="h-16 w-16 text-muted-foreground" />
            <h3 className="font-headline text-2xl">O histórico está vazio</h3>
            <p className="text-muted-foreground">
              Assim que você concluir algumas tarefas, elas aparecerão aqui.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}

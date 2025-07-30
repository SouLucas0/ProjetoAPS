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
import { type Task } from '@/lib/types';
import { CheckCircle2 } from 'lucide-react';

export default function HistoryPage() {
  const completedTasks = MOCK_TASKS.filter(
    (task) => task.status === 'completed'
  ).sort((a,b) => parseISO(b.completionDate!).getTime() - parseISO(a.completionDate!).getTime());

  const priorityBadgeVariant = {
    high: 'destructive',
    medium: 'secondary',
    low: 'default',
  } as const;

  return (
    <>
      <PageHeader
        title="Task History"
        description="A record of all your completed tasks."
      />
      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
          <CardDescription>
            You have completed {completedTasks.length} tasks. Keep up the great
            work!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Completion Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedTasks.length > 0 ? (
                completedTasks.map((task: Task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>
                      <Badge variant={priorityBadgeVariant[task.priority]}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(parseISO(task.dueDate), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      {task.completionDate
                        ? format(parseISO(task.completionDate), 'MMM d, yyyy')
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No completed tasks yet.
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
            <h3 className="font-headline text-2xl">History is Empty</h3>
            <p className="text-muted-foreground">
              Once you complete some tasks, they will show up here.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}

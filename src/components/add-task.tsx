'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TaskForm } from './task-form';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type Tarefa } from '@/lib/types';
import { useTasks } from '@/hooks/use-tasks';

export function AddTask() {
  const [isOpen, setOpen] = useState(false);
  const { toast } = useToast();
  const { addTask } = useTasks();

  const handleAddTask = (data: Omit<Tarefa, 'id' | 'status'>) => {
    addTask({
        ...data,
        id: crypto.randomUUID(),
        status: 'pendente',
    });
    toast({
        title: "Tarefa Adicionada!",
        description: `A tarefa "${data.titulo}" foi criada.`,
    })
    setOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle className="mr-2" />
          Nova Tarefa
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Nova Tarefa</SheetTitle>
          <SheetDescription>
            Preencha os detalhes abaixo para criar uma nova tarefa.
          </SheetDescription>
        </SheetHeader>
        <TaskForm onSubmit={handleAddTask} onCancel={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

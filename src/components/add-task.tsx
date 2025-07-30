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

export function AddTask() {
  const [isOpen, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddTask = (data: Omit<Tarefa, 'id' | 'status'>) => {
    console.log('Nova tarefa:', data);
    // Aqui você adicionaria a lógica para adicionar a tarefa ao estado global ou fazer uma chamada de API
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

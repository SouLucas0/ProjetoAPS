'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const settingsSchema = z.object({
  emailNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(true),
  taskAlerts: z.object({
    nearDueDate: z.boolean().default(true),
    overdue: z.boolean().default(true),
  }),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      taskAlerts: {
        nearDueDate: true,
        overdue: true,
      },
    },
  });

  function onSubmit(data: SettingsFormValues) {
    toast({
      title: 'Configurações Salvas',
      description: 'Suas preferências de notificação foram atualizadas.',
    });
    console.log(data);
  }

  return (
    <>
      <PageHeader
        title="Configurações"
        description="Gerencie suas preferências de notificação e alerta."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Escolha como você quer ser notificado sobre suas tarefas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Notificações por E-mail
                      </FormLabel>
                      <FormDescription>
                        Receba e-mails para atualizações e lembretes importantes de tarefas.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pushNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Notificações Push
                      </FormLabel>
                      <FormDescription>
                        Receba notificações push em seus dispositivos. (Em breve!)
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alertas de Tarefa</CardTitle>
              <CardDescription>
                Selecione quais alertas de tarefa específicos você deseja receber.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <FormField
                control={form.control}
                name="taskAlerts.nearDueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Perto da Data de Entrega</FormLabel>
                      <FormDescription>
                        Receba um alerta quando uma tarefa estiver se aproximando da data de entrega.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="taskAlerts.overdue"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Tarefas Atrasadas</FormLabel>
                      <FormDescription>
                        Receba alertas para tarefas que já passaram da data de entrega.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}

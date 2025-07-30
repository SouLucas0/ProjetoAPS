'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendPasswordReset } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const { error } = await sendPasswordReset(data.email);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível enviar o e-mail de redefinição. Verifique o e-mail e tente novamente.',
      });
    } else {
      toast({
        title: 'E-mail Enviado!',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      });
      router.push('/login');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Esqueceu a senha?</CardTitle>
        <CardDescription>
          Não se preocupe! Digite seu e-mail e enviaremos um link para você
          redefinir sua senha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seuemail@exemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Enviar E-mail de Redefinição
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Lembrou da sua senha?{' '}
          <Link href="/login" className="underline">
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

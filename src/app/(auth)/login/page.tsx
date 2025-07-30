'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '@/lib/firebase/auth';
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
import { type LoginFormData } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginFormData) => {
    const { user, error } = await login(data);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao entrar',
        description: 'E-mail ou senha incorretos. Por favor, tente novamente.',
      });
    } else {
      router.push('/');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Entrar</CardTitle>
        <CardDescription>
          Digite seu e-mail e senha para acessar sua conta.
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
                      placeholder="joana.silva@exemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                   <div className="flex items-center">
                    <FormLabel>Senha</FormLabel>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Entrar
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Não tem uma conta?{' '}
          <Link href="/register" className="underline">
            Cadastre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

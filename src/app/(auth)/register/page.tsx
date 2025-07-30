'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { register, signInWithGoogle } from '@/lib/firebase/auth';
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
import { type RegisterFormData } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.9 2.04-5.07 2.04-4.34 0-7.88-3.57-7.88-7.96s3.54-7.96 7.88-7.96c2.38 0 4.03.98 5.2 2.15l2.63-2.5C18.5 2.33 15.96 1 12.48 1 7.03 1 3 5.03 3 10.5s4.03 9.5 9.48 9.5c2.83 0 5.16-1 6.9-2.83 1.9-1.98 2.6-4.9 2.6-7.36 0-.8-.1-1.44-.22-2.08h-9.56z"
        fill="currentColor"
        />
    </svg>
);

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: RegisterFormData) => {
    // Para fins de teste, redireciona diretamente.
    router.push('/');
    
    // const { user, error } = await register(data);
    // if (error) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Erro ao criar conta',
    //     description: 'Não foi possível criar a conta. O e-mail já pode estar em uso.',
    //   });
    // } else {
    //   toast({
    //     title: 'Conta Criada!',
    //     description: 'Sua conta foi criada com sucesso. Bem-vindo!',
    //   });
    //   router.push('/');
    // }
  };

  const handleGoogleSignIn = async () => {
    // Para fins de teste, redireciona diretamente.
    router.push('/');

    // const { user, error } = await signInWithGoogle();
    // if (error) {
    //    toast({
    //     variant: 'destructive',
    //     title: 'Erro ao entrar com o Google',
    //     description: 'Não foi possível fazer login com o Google. Tente novamente mais tarde.',
    //   });
    // } else {
    //     router.push('/');
    // }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Crie uma conta</CardTitle>
        <CardDescription>
          Insira suas informações para criar uma nova conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Karol" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Karol@gmail.com"
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
                  <FormLabel>Senha</FormLabel>
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
              Criar conta
            </Button>
          </form>
        </Form>
        <div className="relative my-4 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-xs uppercase text-muted-foreground">Ou</span>
            <Separator className="flex-1" />
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-2 h-4 w-4"/>
            Entrar com o Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" className="underline">
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

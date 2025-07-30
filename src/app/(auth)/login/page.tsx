'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login, signInWithGoogle, signInWithGithub } from '@/lib/firebase/auth';
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
import { Separator } from '@/components/ui/separator';

const loginSchema = z.object({
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

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        fill="currentColor"
      />
    </svg>
);


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
    // Para fins de teste, redireciona diretamente.
    router.push('/');
    
    // const { user, error } = await login(data);
    // if (error) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Erro ao entrar',
    //     description: 'E-mail ou senha incorretos. Por favor, tente novamente.',
    //   });
    // } else {
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

  const handleGithubSignIn = async () => {
    // Para fins de teste, redireciona diretamente.
    router.push('/');
    
    // const { user, error } = await signInWithGithub();
    // if (error) {
    //    toast({
    //     variant: 'destructive',
    //     title: 'Erro ao entrar com o Github',
    //     description: 'Não foi possível fazer login com o Github. Tente novamente mais tarde.',
    //   });
    // } else {
    //     router.push('/');
    // }
  }

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
                   <div className="flex items-center">
                    <FormLabel>Senha</FormLabel>
                    <Link
                      href="/forgot-password"
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
        <div className="relative my-4 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-xs uppercase text-muted-foreground">Ou</span>
            <Separator className="flex-1" />
        </div>
        <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                <GoogleIcon className="mr-2 h-4 w-4"/>
                Entrar com o Google
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGithubSignIn}>
                <GithubIcon className="mr-2 h-4 w-4"/>
                Entrar com o Github
            </Button>
        </div>
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

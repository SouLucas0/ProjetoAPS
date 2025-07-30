'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookCheck,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { signOut } from '@/lib/firebase/auth';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/logo';
import { useToast } from '@/hooks/use-toast';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const isActive = (path: string) => pathname === path;
  
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
       toast({
        variant: 'destructive',
        title: 'Erro ao sair',
        description: 'Não foi possível fazer logout. Tente novamente.',
      });
    } else {
      router.push('/login');
    }
  }

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="w-auto h-8" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/')}
                tooltip="Painel"
              >
                <Link href="/">
                  <LayoutDashboard />
                  <span>Painel</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/history')}
                tooltip="Histórico de Tarefas"
              >
                <Link href="/history">
                  <History />
                  <span>Histórico</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/settings')}
                tooltip="Configurações"
              >
                <Link href="/settings">
                  <Settings />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-2" />
          <div className="flex items-center gap-3 p-2">
            <Avatar>
              <AvatarImage src={user.photoURL ?? "https://placehold.co/100x100.png"} alt="Avatar do Usuário" data-ai-hint="profile picture" />
              <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{user.displayName}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Can add breadcrumbs here */}
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

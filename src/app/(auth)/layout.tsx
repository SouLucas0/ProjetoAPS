'use client';

import { type ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '@/components/logo';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        {/* You can add a loader here */}
      </div>
    );
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <Logo />
      </div>
      <div className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}

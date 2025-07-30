import { type ReactNode } from 'react';
import { Logo } from '@/components/logo';

export default function AuthLayout({ children }: { children: ReactNode }) {
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

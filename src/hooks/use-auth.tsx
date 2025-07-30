'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import firebaseApp from '@/lib/firebase/config';
import { Skeleton } from '@/components/ui/skeleton';

const auth = getAuth(firebaseApp);

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
       <div className="flex min-h-screen w-full items-center justify-center">
        <Skeleton className="h-20 w-20 rounded-full" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
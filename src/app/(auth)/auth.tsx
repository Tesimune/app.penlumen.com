'use client';

import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/auth';

interface AuthProps {
  children: ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const { fetchUser, user } = useAuth() as {
    fetchUser: () => void;
    user: { [key: string]: any } | null;
  };

  useEffect(() => {
    fetchUser();
    if (user) {
      window.location.href = '/dashboard';
    }
  }, [fetchUser, user]);

  return (
    <div className='container mx-auto'>
        {children}
    </div>
  );
};

export default Auth;

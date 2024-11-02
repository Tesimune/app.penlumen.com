'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

interface Errors {
  email?: string[];
  password?: string[];
}

export default function Login() {
  const { login } = useAuth() as unknown as {
    login: (params: {
      email: string;
      password: string;
      remember: boolean;
      setErrors: React.Dispatch<React.SetStateAction<Errors>>;
      setStatus: React.Dispatch<React.SetStateAction<string | null>>;
    }) => void;
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={submitForm}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

          <div className='mb-4'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            {errors.email && (
              <p className='text-red-500 text-xs italic'>
                {errors.email.join(', ')}
              </p>
            )}
          </div>

          <div className='mb-6'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='current-password'
            />
            {errors.password && (
              <p className='text-red-500 text-xs italic'>
                {errors.password.join(', ')}
              </p>
            )}
          </div>

          <div className='mb-6'>
            <div className='flex items-center'>
              <Checkbox
                id='remember'
                checked={shouldRemember}
                onCheckedChange={(checked) =>
                  setShouldRemember(checked as boolean)
                }
              />
              <Label htmlFor='remember' className='ml-2'>
                Remember me
              </Label>
            </div>
          </div>

          <div className='flex items-center justify-between mb-6'>
            <Link
              href='/register'
              className='text-sm text-blue-500 hover:text-blue-800'
            >
              Register
            </Link>
            <Link
              href='/forgot-password'
              className='text-sm text-blue-500 hover:text-blue-800'
            >
              Forgot your password?
            </Link>
          </div>

          <div className='flex items-center justify-between'>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </div>

          {status && (
            <Alert className='mt-6'>
              <AlertDescription>{status}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}

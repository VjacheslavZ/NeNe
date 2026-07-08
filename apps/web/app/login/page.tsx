'use client';

import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';

import LoginForm from '@/components/auth/login-form';
import { authClient } from '@/lib/auth/client';
import { LoginFormData } from '@/lib/auth/schema';

export default function SignupPage() {
  const router = useRouter();

  const handleLogin = async (
    data: LoginFormData,
    setError: UseFormSetError<LoginFormData>,
  ) => {
    const { error } = await authClient.signIn.email(data);

    if (error) {
      setError('password', { message: error.message });
      setError('email', { message: error.message });

      return;
    }

    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background my-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Sign into your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Do not have an account?{' '}
            <a
              href="/signup"
              className="font-medium text-primary hover:text-primary/90"
            >
              Create one here
            </a>
          </p>
        </div>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}

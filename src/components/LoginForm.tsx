'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { toast } from 'sonner';

interface LoginFormData {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { loginAsync, isLoading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginAsync(data);
      toast.success('Logged in successfully');
      router.push('/home');
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-sm font-medium">Username</label>
              <Input
                {...register('username', {
                  required: 'Username is required',
                })}
                placeholder="Enter your username"
                error={errors.username?.message}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};



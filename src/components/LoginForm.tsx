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
import { Building2 } from 'lucide-react';

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
      toast.success('Вход выполнен');
      router.push('/home');
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Ошибка входа';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-3">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">BizFlow CRM</h1>
          <p className="text-sm text-muted-foreground">Система управления бизнесом</p>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-xl">Вход в систему</CardTitle>
            <CardDescription>Введите учётные данные сотрудника</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Логин</label>
                <Input
                  {...register('username', { required: 'Введите логин' })}
                  placeholder="ivanov"
                  error={errors.username?.message}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Пароль</label>
                <Input
                  {...register('password', {
                    required: 'Введите пароль',
                    minLength: { value: 6, message: 'Минимум 6 символов' },
                  })}
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                />
              </div>

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Войти
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Нет аккаунта?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Зарегистрироваться
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

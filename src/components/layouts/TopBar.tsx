'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Bell, Search, User } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle }) => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {isAuthenticated && (
          <>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Поиск документов, клиентов..."
                className="h-9 w-64 rounded-lg border border-input bg-muted/50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="ghost" size="icon" title="Уведомления">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Профиль">
              <User className="h-4 w-4" />
            </Button>
          </>
        )}

        {!isAuthenticated && (
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">Вход</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Регистрация</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

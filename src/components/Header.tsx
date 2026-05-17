'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Home, Search, Plus, User, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={isAuthenticated ? '/home' : '/'} className="font-bold text-2xl">
          Bistagram
        </Link>

        {/* Navigation */}
        {isAuthenticated && (
          <nav className="flex items-center gap-2">
            <Link href="/home">
              <Button variant="ghost" size="icon" title="Home">
                <Home className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/explore">
              <Button variant="ghost" size="icon" title="Explore">
                <Search className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/create">
              <Button variant="ghost" size="icon" title="Create">
                <Plus className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        )}

        {/* Auth Links */}
        {!isAuthenticated && (
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};


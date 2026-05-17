'use client';

import React from 'react';
import { Header } from '@/components/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        {children}
      </main>
    </div>
  );
};


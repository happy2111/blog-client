'use client';

import React from 'react';
import { Sidebar, PublicSidebar } from '@/components/layouts/Sidebar';
import { TopBar } from '@/components/layouts/TopBar';
import { useAuth } from '@/hooks/useAuth';

interface ErpLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  publicPage?: boolean;
}

export const ErpLayout: React.FC<ErpLayoutProps> = ({
  children,
  title,
  subtitle,
  publicPage = false,
}) => {
  const { isAuthenticated } = useAuth();
  const showSidebar = isAuthenticated || publicPage;

  return (
    <div className="min-h-screen bg-muted/30">
      {showSidebar && (isAuthenticated ? <Sidebar /> : <PublicSidebar />)}
      <div className={showSidebar ? 'ml-60' : ''}>
        <TopBar title={title} subtitle={subtitle} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

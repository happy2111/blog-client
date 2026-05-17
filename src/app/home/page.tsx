'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Feed } from '@/components/Feed';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <Feed />
      </main>
    </div>
  );
}


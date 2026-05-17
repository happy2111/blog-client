'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { ExploreGrid } from '@/components/ExploreGrid';

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-muted-foreground">Discover posts from the community</p>
        </div>
        <ExploreGrid />
      </main>
    </div>
  );
}


'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { CreatePostForm } from '@/components/CreatePostForm';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <CreatePostForm />
      </main>
    </div>
  );
}


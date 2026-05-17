'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { UserProfile } from '@/components/UserProfile';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function ProfilePage({
                                            params,
                                          }: ProfilePageProps) {
  const { username } = React.use(params);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <UserProfile username={decodeURIComponent(username)} />
      </main>
    </div>
  );
}
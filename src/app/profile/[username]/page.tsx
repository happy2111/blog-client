'use client';

import React from 'react';
import { ErpLayout } from '@/components/layouts/ErpLayout';
import { UserProfile } from '@/components/UserProfile';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = React.use(params);

  return (
    <ErpLayout
      title="Карточка контакта"
      subtitle={decodeURIComponent(username)}
      publicPage
    >
      <UserProfile username={decodeURIComponent(username)} />
    </ErpLayout>
  );
}

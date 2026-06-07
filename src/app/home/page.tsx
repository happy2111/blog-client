'use client';

import React from 'react';
import { ErpLayout } from '@/components/layouts/ErpLayout';
import { Feed } from '@/components/Feed';

export default function HomePage() {
  return (
    <ErpLayout title="Панель управления" subtitle="Обзор ключевых показателей и активности">
      <Feed />
    </ErpLayout>
  );
}

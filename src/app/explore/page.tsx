'use client';

import React from 'react';
import { ErpLayout } from '@/components/layouts/ErpLayout';
import { ExploreGrid } from '@/components/ExploreGrid';

export default function ExplorePage() {
  return (
    <ErpLayout
      title="Каталог документов"
      subtitle="Все зарегистрированные документы в системе"
      publicPage
    >
      <ExploreGrid />
    </ErpLayout>
  );
}

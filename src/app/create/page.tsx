'use client';

import React from 'react';
import { ErpLayout } from '@/components/layouts/ErpLayout';
import { CreatePostForm } from '@/components/CreatePostForm';

export default function CreatePage() {
  return (
    <ErpLayout title="Новый документ" subtitle="Регистрация документа в системе">
      <CreatePostForm />
    </ErpLayout>
  );
}

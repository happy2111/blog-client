'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFeed } from '@/hooks/usePosts';
import { DocumentTable } from '@/components/DocumentTable';
import { DashboardStats, PipelineWidget, TasksWidget } from '@/components/DashboardWidgets';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';

export const Feed: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFeed(page);

  const posts = data || [];
  const hasMore = data?.hasMore || false;

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading && page === 1) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Не удалось загрузить данные</p>
        <Button onClick={() => window.location.reload()}>Повторить</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PipelineWidget />
        </div>
        <TasksWidget />
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Лента активности</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Документы от ваших контактов
            </p>
          </div>
          <Link href="/explore">
            <Button variant="outline" size="sm">Весь каталог</Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          {posts.length === 0 && page === 1 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground mb-2">Нет активности</p>
              <p className="text-sm text-muted-foreground mb-6">
                Добавьте контакты, чтобы видеть их документы
              </p>
              <Link href="/explore">
                <Button>Открыть каталог</Button>
              </Link>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={posts.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={<Skeleton className="mx-4 h-12 w-auto" />}
              endMessage={
                posts.length > 0 ? (
                  <p className="text-center text-xs text-muted-foreground py-4">
                    Все записи загружены
                  </p>
                ) : null
              }
            >
              <DocumentTable
                posts={posts}
                emptyMessage="Нет документов в ленте"
              />
            </InfiniteScroll>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

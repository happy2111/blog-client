'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useExplore } from '@/hooks/usePosts';
import { DocumentTable } from '@/components/DocumentTable';
import { PostDetailModal } from '@/components/PostDetailModal';
import { Skeleton } from '@/components/ui/Skeleton';
import { Post } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ExploreGrid: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useExplore(page);

  const posts = data || [];
  const hasMore = data?.hasMore || false;

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  if (isLoading && page === 1) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Не удалось загрузить каталог</p>
      </div>
    );
  }

  return (
    <>
      <Card className="border-border/60 shadow-sm mb-4">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Всего записей: <strong className="text-foreground">{posts.length}</strong></span>
          </div>
          <Button variant="outline" size="sm" disabled>
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </CardContent>
      </Card>

      <InfiniteScroll
        dataLength={posts.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<Skeleton className="h-12 w-full mt-2" />}
      >
        <DocumentTable
          posts={posts}
          onRowClick={handlePostClick}
          showActions
          emptyMessage="Каталог пуст"
        />
      </InfiniteScroll>

      <PostDetailModal
        post={selectedPost}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

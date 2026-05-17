'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFeed } from '@/hooks/usePosts';
import { Post } from '@/types';
import { PostCard } from '@/components/PostCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
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
      <div className="max-w-2xl mx-auto space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full h-150" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-destructive mb-4">Failed to load posts</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (posts.length === 0 && page === 1) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-muted-foreground mb-4">No posts in your feed yet</p>
        <p className="text-sm text-muted-foreground mb-6">
          Follow users to see their posts here
        </p>
        <Link href="/explore">
          <Button>Explore Posts</Button>
        </Link>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<Skeleton className="w-full h-150" />}
      endMessage={
        <p className="text-center text-muted-foreground py-4">
          {posts.length > 0 ? "You've reached the end" : 'No posts found'}
        </p>
      }
    >
      <div className="max-w-2xl mx-auto space-y-4">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </InfiniteScroll>
  );
};


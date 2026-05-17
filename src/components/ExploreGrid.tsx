'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useExplore } from '@/hooks/usePosts';
import { PostCard } from '@/components/PostCard';
import { PostDetailModal } from '@/components/PostDetailModal';
import { Skeleton } from '@/components/ui/Skeleton';
import { Post } from '@/types';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {[...Array(12)].map((_, i) => (
          <Skeleton key={i} className="w-full h-80" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load posts</p>
      </div>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-full h-80" />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {posts.map((post: any) => (
            <div
              key={post.id}
              className="cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <PostDetailModal
        post={selectedPost}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};



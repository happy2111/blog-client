'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { formatDistanceToNow } from '@/utils/dateUtils';

interface PostCardProps {
  post: Post;
  onImageError?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onImageError }) => {
  const authorName = post.authorUsername || 'Unknown';

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {/* Изображение */}
        <div className="relative w-full aspect-square bg-muted overflow-hidden">
          <img
            src={post.mediaUrl}
            alt={post.caption}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
            onError={onImageError}
          />
          {post.visibility === 'PRIVATE' && (
            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
              Private
            </div>
          )}
        </div>

        {/* Информация о посте */}
        <div className="p-4 space-y-2">
          {/* Автор и дата */}
          <div className="flex items-center justify-between">
            <Link href={`/profile/${authorName}`} className="font-semibold hover:text-primary truncate">
              {authorName}
            </Link>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt))}
            </span>
          </div>

          {/* Описание */}
          {post.caption && (
            <p className="text-sm text-foreground line-clamp-2">
              {post.caption}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


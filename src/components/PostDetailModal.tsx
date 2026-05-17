'use client';

import React from 'react';
import { Post } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';
import { formatDistanceToNow } from '@/utils/dateUtils';
import { X } from 'lucide-react';

interface PostDetailModalProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, open, onOpenChange }) => {
  if (!post) return null;

  const authorName = post.author?.username || 'Unknown';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="bg-black aspect-square flex items-center justify-center md:max-h-[600px]">
            <img
              src={post.mediaUrl}
              alt={post.caption}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col p-6">
            {/* Author Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              <Avatar
                src={post.author?.avatarUrl || undefined}
                fallback={post.authorUsername[0].toUpperCase()}
              />
              <div>
                <Link
                  href={`/profile/${post.authorUsername}`}
                  className="font-semibold hover:text-primary"
                  onClick={() => onOpenChange(false)}
                >
                  {post.authorUsername}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt))}
                </p>
              </div>
            </div>

            {/* Caption */}
            <div className="flex-1">
              <p className="text-sm whitespace-pre-wrap">{post.caption}</p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t text-xs text-muted-foreground">
              {post.visibility === 'PRIVATE' && (
                <p>🔒 Private - Only visible to followers</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


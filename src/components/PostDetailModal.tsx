'use client';

import React from 'react';
import { Post } from '@/types';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';
import { formatDistanceToNow, formatDate } from '@/utils/dateUtils';
import { statusLabels } from '@/data/mockDashboard';
import { X, FileText, Calendar, User, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostDetailModalProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, open, onOpenChange }) => {
  if (!post) return null;

  const authorName = post.authorUsername || '—';
  const status = statusLabels[post.visibility] || statusLabels.PUBLIC;
  const docId = `DOC-${String(post.id).padStart(5, '0')}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-border bg-muted/30 px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <FileText className="h-3.5 w-3.5" />
            <span className="font-mono">{docId}</span>
            <span className={cn('ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium', status.className)}>
              {status.label}
            </span>
          </div>
          <h2 className="text-lg font-semibold">{post.caption || 'Без названия'}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          <div className="md:col-span-3 bg-muted/20 flex items-center justify-center min-h-[280px] max-h-[480px]">
            {post.mediaUrl ? (
              <img
                src={post.mediaUrl}
                alt={post.caption}
                className="w-full h-full object-contain max-h-[480px]"
              />
            ) : (
              <FileText className="h-16 w-16 text-muted-foreground/30" />
            )}
          </div>

          <div className="md:col-span-2 flex flex-col p-6 border-l border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Карточка документа
            </p>

            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Ответственный</p>
                  <Link
                    href={`/profile/${authorName}`}
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={() => onOpenChange(false)}
                  >
                    {authorName}
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Дата создания</p>
                  <p className="text-sm">{formatDate(new Date(post.createdAt))}</p>
                  <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(post.createdAt))}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Уровень доступа</p>
                  <p className="text-sm">{status.label}</p>
                </div>
              </div>

              {post.caption && (
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground mb-1">Описание</p>
                  <p className="text-sm whitespace-pre-wrap">{post.caption}</p>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t flex items-center gap-2">
              <Avatar
                src={post.author?.avatarUrl || undefined}
                fallback={authorName[0]?.toUpperCase()}
                className="h-8 w-8"
              />
              <div>
                <p className="text-sm font-medium">{authorName}</p>
                <p className="text-xs text-muted-foreground">Менеджер</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

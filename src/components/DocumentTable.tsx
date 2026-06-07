'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { formatDistanceToNow, formatDate } from '@/utils/dateUtils';
import { statusLabels } from '@/data/mockDashboard';
import { FileText, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentRowProps {
  post: Post;
  onClick?: () => void;
  showActions?: boolean;
}

export const DocumentRow: React.FC<DocumentRowProps> = ({ post, onClick, showActions }) => {
  const authorName = post.authorUsername || '—';
  const status = statusLabels[post.visibility] || statusLabels.PUBLIC;
  const docId = `DOC-${String(post.id).padStart(5, '0')}`;

  return (
    <tr
      className={cn(
        'border-b border-border/60 transition-colors',
        onClick && 'cursor-pointer hover:bg-muted/50'
      )}
      onClick={onClick}
    >
      <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{docId}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 overflow-hidden">
            {post.mediaUrl ? (
              <img src={post.mediaUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <FileText className="h-4 w-4 text-primary" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate max-w-[240px]">
              {post.caption || 'Без названия'}
            </p>
            <p className="text-xs text-muted-foreground">{formatDate(new Date(post.createdAt))}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Link
          href={`/profile/${authorName}`}
          className="text-sm text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {authorName}
        </Link>
      </td>
      <td className="px-4 py-3">
        <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', status.className)}>
          {status.label}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground">
        {formatDistanceToNow(new Date(post.createdAt))}
      </td>
      {showActions && onClick && (
        <td className="px-4 py-3">
          <button className="rounded p-1 hover:bg-muted" onClick={(e) => { e.stopPropagation(); onClick(); }}>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </button>
        </td>
      )}
    </tr>
  );
};

interface DocumentTableProps {
  posts: Post[];
  onRowClick?: (post: Post) => void;
  showActions?: boolean;
  emptyMessage?: string;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({
  posts,
  onRowClick,
  showActions = false,
  emptyMessage = 'Документы не найдены',
}) => {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-border/60 bg-card py-12 text-center">
        <FileText className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border/60 bg-card overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">№</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Документ</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ответственный</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Статус</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Обновлён</th>
              {showActions && onRowClick && (
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground w-10"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <DocumentRow
                key={post.id}
                post={post}
                showActions={showActions}
                onClick={onRowClick ? () => onRowClick(post) : undefined}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

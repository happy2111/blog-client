'use client';

import React, { useState } from 'react';
import { useUserProfile, useFollowUser, useUnfollowUser } from '@/hooks/useUsers';
import { useUserPosts } from '@/hooks/usePosts';
import { DocumentTable } from '@/components/DocumentTable';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserCheck, Users, Mail, Building, Phone } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Post } from '@/types';
import { PostDetailModal } from '@/components/PostDetailModal';

interface UserProfileProps {
  username: string;
  isCurrentUser?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ username, isCurrentUser = false }) => {
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: profile, isLoading: profileLoading } = useUserProfile(username);
  const { data: postsData, isLoading: postsLoading } = useUserPosts(username, page);
  const { mutate: follow, isPending: followLoading } = useFollowUser();
  const { mutate: unfollow, isPending: unfollowLoading } = useUnfollowUser();

  const posts = postsData || [];
  const hasMore = postsData?.hasMore || false;

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleFollow = () => {
    if (profile?.isFollowing) {
      unfollow(username);
    } else {
      follow(username);
    }
  };

  const isFollowing = profile?.isFollowing;

  if (profileLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Контакт не найден</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/60 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Avatar src={profile.avatarUrl} fallback={username[0]} className="h-20 w-20 text-xl" />

            <div className="flex-1">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Контакт
                  </p>
                  <h1 className="text-2xl font-bold">{profile.username}</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    ID: CLT-{String(profile.id).padStart(6, '0')}
                  </p>
                </div>

                {!isCurrentUser && (
                  <Button
                    onClick={handleFollow}
                    isLoading={followLoading || unfollowLoading}
                    variant={isFollowing ? 'outline' : 'default'}
                    size="sm"
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        В работе
                      </>
                    ) : (
                      <>
                        <Users className="h-4 w-4 mr-2" />
                        Взять в работу
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-4 sm:max-w-md">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xl font-bold">{posts.length}</p>
                  <p className="text-xs text-muted-foreground">Документов</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xl font-bold">{profile.followersCount}</p>
                  <p className="text-xs text-muted-foreground">Связей</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xl font-bold">{profile.followingCount}</p>
                  <p className="text-xs text-muted-foreground">Клиентов</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {profile.email || `${username}@company.ru`}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5" />
                  ООО «{username}»
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  +7 (900) 000-00-00
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Документы контакта</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          {postsLoading && page === 1 ? (
            <Skeleton className="mx-4 h-48 w-auto mb-4" />
          ) : posts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Документов пока нет</p>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={posts.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={<Skeleton className="mx-4 h-12 w-auto" />}
            >
              <DocumentTable
                posts={posts}
                onRowClick={(post) => { setSelectedPost(post); setIsModalOpen(true); }}
                showActions
              />
            </InfiniteScroll>
          )}
        </CardContent>
      </Card>

      <PostDetailModal
        post={selectedPost}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

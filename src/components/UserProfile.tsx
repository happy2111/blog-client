'use client';

import React, { useState } from 'react';
import { useUserProfile, useFollowUser, useUnfollowUser } from '@/hooks/useUsers';
import { useUserPosts } from '@/hooks/usePosts';
import { PostCard } from '@/components/PostCard';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Users, UserCheck } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Post} from "@/types";

interface UserProfileProps {
  username: string;
  isCurrentUser?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ username, isCurrentUser = false }) => {


  const [page, setPage] = useState(1);
  const { data: profile, isLoading: profileLoading } = useUserProfile(username);
  const { data: postsData, isLoading: postsLoading } = useUserPosts(username, page);
  const { mutate: follow, isPending: followLoading } = useFollowUser();
  const { mutate: unfollow, isPending: unfollowLoading } = useUnfollowUser();

  const posts = postsData|| [];
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

  if (profileLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-32 w-32 rounded-full" />
        <Skeleton className="h-12 w-64" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-center gap-8 mb-12">
        <Avatar src={profile.avatarUrl} fallback={username[0]} className="h-32 w-32" />

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{profile.username}</h1>

          {/* Stats */}
          <div className="flex gap-8 mb-6">
            <div>
              <p className="text-2xl font-semibold">{posts.length}</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{profile.followersCount}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{profile.followingCount}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          {/* Follow Button */}
          {!isCurrentUser && (
            <Button
              onClick={handleFollow}
              isLoading={followLoading || unfollowLoading}
              variant={profile.isFollowing ? 'outline' : 'default'}
            >
              {profile.isFollowing ? (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Unfollow
                </>
              ) : profile?.followed ? (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Unfollow
                </>
              ) : (
                <>
                  <Users className="h-4 w-4 mr-2" />
                  Follow
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Posts</h2>

        {postsLoading && page === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-full h-80" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet</p>
          </div>
        ) : (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};


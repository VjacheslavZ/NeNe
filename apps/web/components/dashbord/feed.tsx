'use client';

import { Post } from '@repo/trpc/schemas';
import { Heart, MessageCircle, User } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getImageUrl } from '@/lib/image';

interface FeedProps {
  posts: Post[];
  onLikePost: (postID: number) => void;
}

export default function Feed({ posts, onLikePost }: FeedProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => {
        return (
          <Card key={post.id} className="overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                {getImageUrl(post.user.avatar) ? (
                  <Image
                    src={getImageUrl(post.user.avatar)}
                    alt={post.user.username}
                    width={64}
                    height={64}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}

                <span className="font-semibold text-sm">
                  {post.user.username}
                </span>
              </div>
            </div>
            <div className="aspect-square relative">
              <Image
                src={getImageUrl(post.image)}
                alt="post"
                className="object-cover"
                fill
              />
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLikePost(post.id)}
                    className="p-0 h-auto"
                  >
                    <Heart
                      className={`w-6 h-6 text-foreground ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {}}
                    className="p-0 h-auto"
                  >
                    <MessageCircle className="w-6 h-6 text-foreground" />
                  </Button>
                </div>
              </div>

              <div className="text-sm font-semibold">{post.likes} likes</div>
              <div className="text-sm">
                <span className="font-semibold">
                  {post.user.username} {post.caption}
                </span>
              </div>

              {post.comments > 0 && (
                <div className="text-sm text-muted-foreground">
                  View all {post.comments} comments
                </div>
              )}

              <div className="text-sm text-muted-foreground uppercase">
                {new Date(post.timestamp).toLocaleDateString()}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

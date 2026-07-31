'use client';

import { Post } from '@repo/trpc/schemas';
import { Heart, MessageCircle, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import PostComments from '@/components/dashbord/post-comments';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getImageUrl } from '@/lib/image';

interface FeedProps {
  posts: Post[];
  onLikePost: (postID: number) => void;
  onAddComment: (postID: number, text: string) => void;
  onDeleteComment: (commentId: number) => void;
}

export default function Feed({
  posts,
  onLikePost,
  onAddComment,
  onDeleteComment,
}: FeedProps) {
  const router = useRouter();

  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set(),
  );

  const toggleComments = (postId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => {
        return (
          <Card key={post.id} className="overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  className="p-0"
                  onClick={() => router.push(`/users/${post.user.id}`)}
                >
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
                </Button>
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
                    onClick={() => toggleComments(post.id)}
                    className="p-0 h-auto"
                  >
                    <MessageCircle
                      className={`w-6 h-6 text-foreground ${expandedComments.has(post.id) ? 'fill-primary text-primary' : 'text-foreground'}`}
                    />
                  </Button>
                </div>
              </div>

              <div className="text-sm font-semibold">{post.likes} likes</div>
              <div className="text-sm">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-semibold hover:bg-transparent hover:opacity-80"
                  onClick={() => router.push(`/users/${post.user.id}`)}
                >
                  <span className="font-semibold">
                    {post.user.username} {post.caption}
                  </span>
                </Button>
              </div>

              {post.comments > 0 && (
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-sm text-muted-foreground hover:bg-transparent hover:opacity-80"
                >
                  <div className="text-sm text-muted-foreground">
                    View all {post.comments} comments
                  </div>
                </Button>
              )}

              <div className="text-sm text-muted-foreground uppercase">
                {new Date(post.timestamp).toLocaleDateString()}
              </div>

              {expandedComments.has(post.id) && (
                <div className="pt-4 border-t">
                  <PostComments
                    postId={post.id}
                    onAddComment={onAddComment}
                    onDeleteComment={onDeleteComment}
                  />
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

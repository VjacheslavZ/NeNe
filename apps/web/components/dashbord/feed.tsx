"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      username: "johndoe",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face",
    },
    timestamp: "2 hours",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    caption: "Beautiful sunset at the beach likes: 142, comments: 8,",
    comments: 8,
    likes: 142,
  },
  {
    id: "2",
    user: {
      username: "johndoe",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=608h=6Q/fit=crop&crop=faces",
    },
    timestamp: "4 hours",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    caption: "Beautiful sunset at the beach likes: 142, comments: 8,",
    comments: 23,
    likes: 189,
  },
  {
    id: "3",
    user: {
      username: "johndoe",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face",
    },
    timestamp: "7 hours",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    caption: "Beautiful sunset at the beach likes: 142, comments: 8,",
    comments: 22,
    likes: 456,
  },
];

export default function Feed() {
  return (
    <div className="space-y-6">
      {mockPosts.map((post) => {
        return (
          <Card key={post.id} className="overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Image
                  src={post.user.avatar}
                  alt={post.user.username}
                  width={64}
                  height={64}
                  className="w-8 h-8 rounded-full "
                />
                <span className="font-semibold text-sm">
                  {post.user.username}
                </span>
              </div>
            </div>
            <div className="aspect-square relative">
              <Image
                src={post.image}
                alt="post"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {}}
                    className="p-0 h-auto"
                  >
                    <Heart className="w-6 h-6 text-foreground" />
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
                {post.timestamp}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

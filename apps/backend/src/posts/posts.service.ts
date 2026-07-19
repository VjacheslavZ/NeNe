import { Inject, Injectable } from '@nestjs/common';
import { CreatePostInput, Post } from '@repo/trpc/schemas';
import { desc } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm/sql/expressions/conditions';

import { UsersService } from '../auth/users/users.service';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { schema } from '../database/database.module';
import { like, post } from './schemas/schema';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly usersService: UsersService,
  ) {}

  async likePost(postId: number, userId: string) {
    const existingLike = await this.database.query.like.findFirst({
      where: and(eq(like.postId, postId), eq(like.userId, userId)),
    });

    if (existingLike) {
      await this.database.delete(like).where(eq(like.id, existingLike.id));
    } else {
      await this.database.insert(like).values({ postId, userId });
    }
  }

  async create(createPostInput: CreatePostInput, userId: string) {
    await this.database.insert(post).values({
      userId,
      caption: createPostInput.caption,
      image: createPostInput.image,
      createdAt: new Date(),
    });
  }

  async findAll(userId: string): Promise<Post[]> {
    const posts = await this.database.query.post.findMany({
      with: { user: true, likes: true, comments: true },
      orderBy: [desc(post.createdAt)],
    });

    return posts.map((post) => ({
      id: post.id,
      user: {
        username: post.user.name,
        avatar: post.user.image || '',
      },
      image: post.image,
      caption: post.caption,
      likes: post.likes.length,
      timestamp: post.createdAt.toISOString(),
      comments: post.comments.length,
      isLiked: post.likes.some((like) => like.userId === userId),
    }));
  }
}

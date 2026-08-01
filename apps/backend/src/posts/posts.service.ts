import { Inject, Injectable } from '@nestjs/common';
import { CreatePostInput, Post } from '@repo/trpc/schemas';
import { desc, inArray } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm/sql/expressions/conditions';

import { follow } from '../auth/schema';
import { UsersService } from '../auth/users/users.service';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { schema } from '../database/database.module';
import { like, post, savedPost } from './schemas/schema';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly usersService: UsersService,
  ) {}

  private async getFollowedUserIds(userId: string) {
    const following = await this.database
      .select({ id: follow.followingId })
      .from(follow)
      .where(eq(follow.followerId, userId));

    return [userId, ...following.map((f) => f.id)];
  }

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

  async findAll(userId: string, postUserId?: string): Promise<Post[]> {
    const posts = await this.database.query.post.findMany({
      with: { user: true, likes: true, comments: true },
      where: postUserId
        ? eq(post.userId, postUserId)
        : inArray(post.userId, await this.getFollowedUserIds(userId)),
      orderBy: [desc(post.createdAt)],
    });

    const savedPosts = await this.getSavedPosts(userId);

    return posts.map((post) => ({
      id: post.id,
      user: {
        username: post.user.name,
        avatar: post.user.image || '',
        id: post.user.id,
      },
      image: post.image,
      caption: post.caption,
      likes: post.likes.length,
      timestamp: post.createdAt.toISOString(),
      comments: post.comments.length,
      isLiked: post.likes.some((like) => like.userId === userId),
      isSaved: savedPosts.map((sp) => sp.id).includes(post.id),
    }));
  }

  async savePost(postId: number, userId: string) {
    const existingSave = await this.database.query.savedPost.findFirst({
      where: and(eq(savedPost.postId, postId), eq(savedPost.userId, userId)),
    });

    if (existingSave) {
      await this.database
        .delete(savedPost)
        .where(eq(savedPost.id, existingSave.id));
    } else {
      await this.database
        .insert(savedPost)
        .values({ postId, userId, createdAt: new Date() });
    }
  }

  async getSavedPosts(userId: string): Promise<Post[]> {
    const savedPosts = await this.database.query.savedPost.findMany({
      where: eq(savedPost.userId, userId),
      with: {
        post: {
          with: {
            user: true,
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: [desc(savedPost.createdAt)],
    });

    return savedPosts.map((sp) => ({
      id: sp.post.id,
      user: {
        username: sp.post.user.name,
        name: sp.post.user.name,
        avatar: sp.post.user.image || '',
        id: sp.post.user.id,
      },
      image: sp.post.image,
      caption: sp.post.caption,
      likes: sp.post.likes.length,
      timestamp: sp.post.createdAt.toISOString(),
      comments: sp.post.comments.length,
      isLiked: sp.post.likes.some((like) => like.userId === userId),
      isSaved: true,
    }));
  }
}

import { Input, Mutation, Router, Query } from 'nestjs-trpc';
import { z } from 'zod';

import {
  CreatePostInput,
  createPostSchema,
  postSchema,
} from './schemas/trpc.schema';
import { PostsService } from './posts.service';

@Router()
export class PostsRouter {
  constructor(private readonly postsService: PostsService) {}

  @Mutation({ input: createPostSchema, output: postSchema })
  async create(@Input() createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput, '123');
  }

  @Query({ output: z.array(postSchema) })
  async findAll() {
    return this.postsService.findAll();
  }
}

import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from '@mguay/nestjs-trpc';
import {
  CreatePostInput,
  createPostSchema,
  LikePostInput,
  likePostSchema,
  postSchema,
} from '@repo/trpc/schemas';
import { z } from 'zod';

import { AppContext } from '../app-context.interface';
import { AuthTrpcMiddleware } from '../auth/auth-trpc.middleware';
import { PostsService } from './posts.service';

@Router()
@UseMiddlewares(AuthTrpcMiddleware)
export class PostsRouter {
  constructor(private readonly postsService: PostsService) {}

  @Mutation({ input: createPostSchema })
  async create(
    @Input() createPostInput: CreatePostInput,
    @Ctx() context: AppContext,
  ) {
    return this.postsService.create(createPostInput, context.user.id);
  }

  @Query({ output: z.array(postSchema) })
  async findAll(@Ctx() context: AppContext) {
    return this.postsService.findAll(context.user.id);
  }

  @Mutation({ input: likePostSchema })
  async likePost(
    @Input() likePostInput: LikePostInput,
    @Ctx() context: AppContext,
  ) {
    return this.postsService.likePost(likePostInput.postId, context.user.id);
  }
}

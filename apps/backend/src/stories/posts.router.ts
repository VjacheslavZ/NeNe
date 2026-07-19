import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from '@mguay/nestjs-trpc';
import {
  CreateStoryInput,
  createStorySchema,
  storyGroupSchema,
} from '@repo/trpc/schemas';
import { z } from 'zod';

import { AppContext } from '../app-context.interface';
import { AuthTrpcMiddleware } from '../auth/auth-trpc.middleware';
import { StoriesService } from './stories.service';

@Router()
@UseMiddlewares(AuthTrpcMiddleware)
export class StoriesRouter {
  constructor(private readonly storiesService: StoriesService) {}

  @Mutation({ input: createStorySchema })
  async create(
    @Input() createStoryInput: CreateStoryInput,
    @Ctx() context: AppContext,
  ) {
    return this.storiesService.create(createStoryInput, context.user.id);
  }

  @Query({ output: z.array(storyGroupSchema) })
  async getStories(@Ctx() context: AppContext) {
    return this.storiesService.getStories(context.user.id);
  }
}

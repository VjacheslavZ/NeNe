import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from '@mguay/nestjs-trpc';
import {
  commentSchema,
  CreateCommentInput,
  createCommentSchema,
  DeleteCommentInput,
  deleteCommentSchema,
  GetCommentsInput,
  getCommentsSchema,
} from '@repo/trpc/schemas';
import { z } from 'zod';

import { AppContext } from '../app-context.interface';
import { AuthTrpcMiddleware } from '../auth/auth-trpc.middleware';
import { CommentsService } from './comments.service';

@Router()
@UseMiddlewares(AuthTrpcMiddleware)
export class CommentsRouter {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation({ input: createCommentSchema })
  async create(
    @Input() createCommentInput: CreateCommentInput,
    @Ctx() context: AppContext,
  ) {
    return this.commentsService.create(createCommentInput, context.user.id);
  }

  @Query({ input: getCommentsSchema, output: z.array(commentSchema) })
  async findByPostId(@Input() getCommentsInput: GetCommentsInput) {
    return this.commentsService.findByPostId(getCommentsInput.postId);
  }

  @Mutation({ input: deleteCommentSchema })
  async delete(
    @Input() deleteCommentInput: DeleteCommentInput,
    @Ctx() context: AppContext,
  ) {
    return this.commentsService.delete(
      deleteCommentInput.commentId,
      context.user.id,
    );
  }
}

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CommentsService } from './comments.service';
import { CommentsRouter } from './commnets.router';

@Module({
  imports: [DatabaseModule],
  providers: [CommentsService, CommentsRouter],
})
export class CommentsModule {}

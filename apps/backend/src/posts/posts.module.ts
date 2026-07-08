import { Module } from '@nestjs/common';

import { UsersModule } from '../auth/users/users.module';
import { DatabaseModule } from '../database/database.module';
import { PostsRouter } from './posts.router';
import { PostsService } from './posts.service';

@Module({
  imports: [UsersModule, DatabaseModule],
  providers: [PostsService, PostsRouter],
})
export class PostsModule {}

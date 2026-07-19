import { Module } from '@nestjs/common';

import { StoriesRouter } from './posts.router';
import { StoriesService } from './stories.service';

@Module({
  providers: [StoriesService, StoriesRouter],
})
export class StoriesModule {}

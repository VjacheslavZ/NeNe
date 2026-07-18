import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as authSchema from '../auth/schema';
import * as commentsSchema from '../comments/schemas/schema';
import * as postSchema from '../posts/schemas/schema';
import { DATABASE_CONNECTION } from './database-connection';

export const schema = { ...authSchema, ...postSchema, ...commentsSchema };

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
        });
        return drizzle(pool, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

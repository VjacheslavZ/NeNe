import * as fs from 'node:fs';
import path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as authSchema from '../auth/schema';
import * as commentsSchema from '../comments/schemas/schema';
import * as postSchema from '../posts/schemas/schema';
import * as storiesSchema from '../stories/schemas/schema';
import { DATABASE_CONNECTION } from './database-connection';

export const schema = {
  ...authSchema,
  ...postSchema,
  ...commentsSchema,
  ...storiesSchema,
};

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        let ssl: any = false;
        if (configService.get('NODE_ENV') === 'production') {
          const certPath = path.resolve(__dirname, '../../global-bundle.pem');
          const certificate = fs.readFileSync(certPath).toString();
          ssl = { ca: certificate };
        }

        const pool = new Pool({
          host: configService.getOrThrow('DATABASE_HOST'),
          port: parseInt(configService.getOrThrow('DATABASE_PORT')),
          user: configService.getOrThrow('DATABASE_USER'),
          password: configService.getOrThrow('DATABASE_PASSWORD'),
          database: configService.getOrThrow('DATABASE_NAME'),
          ssl,
        });
        return drizzle(pool, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

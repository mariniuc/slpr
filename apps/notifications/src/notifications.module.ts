import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/notifications/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_OAUTH_REFRESH_TOKEN: Joi.string().required(),
        SMTP_USER: Joi.string().required(),
      }),
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}

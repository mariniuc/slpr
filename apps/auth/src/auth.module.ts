import {Module, ValidationPipe} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import {LoggerModule} from "@app/common";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {ConfigModule as NestConfigModule} from "@nestjs/config/dist/config.module";
import * as Joi from "joi";
import {APP_PIPE} from "@nestjs/core";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
      UsersModule,
      LoggerModule,
      NestConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './apps/auth/.env',
          validationSchema: Joi.object({
              JWT_SECRET: Joi.string().required(),
              JWT_EXPIRATION: Joi.number().required(),
              PORT: Joi.number().required(),
          }),
      }),
      JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_SECRET'),
              signOptions: {
                  expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
              }
          }),
          inject: [ConfigService],
      }),

  ],
  controllers: [AuthController],
  providers: [
      AuthService,
      LocalStrategy,
      JwtStrategy,
      {
          provide: APP_PIPE,
          useClass: ValidationPipe,
      }
  ],
})
export class AuthModule {}

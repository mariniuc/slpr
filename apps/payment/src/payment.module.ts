import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import * as Joi from 'joi';
import { LoggerModule, NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule,
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/payment/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        NOTIFICATIONS_HOST: Joi.string().required(),
        NOTIFICATIONS_PORT: Joi.number().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NOTIFICATIONS_HOST'),
            port: configService.get('NOTIFICATIONS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}

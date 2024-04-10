import {Module} from '@nestjs/common';
import {AUTH_SERVICE, DatabaseModule, LoggerModule} from "@app/common";
import {ReservationsController} from './reservations.controller';
import {ReservationsService} from './reservations.service';
import {ReservationsRepository} from "./reservations.repository";
import {ReservationDocument, ReservationSchema} from "./models/reservation.schema";
import {ConfigModule as NestConfigModule} from "@nestjs/config/dist/config.module";
import * as Joi from "joi";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [
      DatabaseModule,
      DatabaseModule.forFeature([{name: ReservationDocument.name, schema: ReservationSchema}]),
      LoggerModule,
      NestConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './apps/reservations/.env',
          validationSchema: Joi.object({
              MONGODB_URI: Joi.string().required(),
              PORT: Joi.number().required(),
          }),
      }),
      ClientsModule.registerAsync([
          {
              name: AUTH_SERVICE,
              useFactory: (configService: ConfigService) => ({
                  transport: Transport.TCP,
                  options: {
                      host: configService.get('AUTH_HOST'),
                      port: configService.get('AUTH_PORT'),
                  },
              }),
              inject: [ConfigService],
          },
      ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}

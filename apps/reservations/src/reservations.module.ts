import { Module } from '@nestjs/common';
import {DatabaseModule, LoggerModule} from "@app/common";
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import {ReservationsRepository} from "./reservations.repository";
import {ReservationDocument, ReservationSchema} from "./models/reservation.schema";
import {ConfigModule as NestConfigModule} from "@nestjs/config/dist/config.module";
import * as Joi from "joi";

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
      })
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}

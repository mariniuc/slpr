import {InjectModel, Schema} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Logger} from "@nestjs/common";
import {AbstractRepository} from "@app/common";
import {ReservationDocument} from "./models/reservation.schema";

@Schema()
export class ReservationsRepository extends AbstractRepository<ReservationDocument>{
    protected readonly logger = new Logger(ReservationsRepository.name);

    constructor(@InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>) {
        super(reservationModel);
    }
}

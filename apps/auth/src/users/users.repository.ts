import {InjectModel, Schema} from "@nestjs/mongoose";
import {Types, Model, FilterQuery, UpdateQuery} from "mongoose";
import {Logger, NotFoundException} from "@nestjs/common";
import {AbstractRepository} from "@app/common";
import {UserDocument} from "./models/user.schema";

@Schema()
export class UsersRepository extends AbstractRepository<UserDocument>{
    protected readonly logger = new Logger(UsersRepository.name);

    constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
        super(userModel);
    }
}
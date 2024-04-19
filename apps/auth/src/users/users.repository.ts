import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { AbstractRepository, UserDocument } from '@app/common';

@Schema()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}

import {Module, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {DatabaseModule} from "@app/common";
import {UserDocument, UserSchema} from "./models/user.schema";
import {UsersRepository} from "./users.repository";
import {APP_PIPE} from "@nestjs/core";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{name: UserDocument.name, schema: UserSchema}]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}

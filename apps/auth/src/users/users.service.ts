import {Injectable, UnauthorizedException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UsersRepository} from "./users.repository";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
  }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    });
  }

  findAll() {
    return this.usersRepository.find({});
  }

  findOne(id: string) {
    return this.usersRepository.findOne({_id: id});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate({_id: id}, {$set: updateUserDto});
  }

  remove(id: string) {
    return this.usersRepository.findOneAndDelete({_id: id});
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({email});
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid!')
    }
    return user;
  }
}

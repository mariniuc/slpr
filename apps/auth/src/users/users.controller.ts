import {Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {CurrentUser, UserDocument} from "@app/common";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    Logger.log(createUserDto.email + " user create: " + createUserDto.password)
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    Logger.log(" findAll user controller: ")
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    Logger.log(id + " findOne user controller: ")
    return this.usersService.findOne({_id: id});
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: UserDocument) {
    Logger.log(user.email + " get user controller: ")
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    Logger.log(id + " update user controller: ")
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    Logger.log(id + " remove user controller: ")
    return this.usersService.remove(id);
  }
}

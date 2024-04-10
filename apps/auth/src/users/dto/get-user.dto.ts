import {IsEmail, IsString} from "class-validator";

export class GetUserDto {

    @IsString()
    @IsEmail()
    _id: string;
}

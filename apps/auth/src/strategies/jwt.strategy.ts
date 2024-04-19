import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../model/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          request?.cookies?.Authentication || request?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    Logger.log(userId + ' validate jwt strategy ');
    const user = await this.userService.getUser({ _id: userId });
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

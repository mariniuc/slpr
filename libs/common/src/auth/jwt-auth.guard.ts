import {
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, tap } from 'rxjs';
import { UserDto } from '@app/common/dto';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Reflector } from '@nestjs/core';

export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) return false;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return this.authClient
      .send<UserDto>('authenticate', { Authentication: jwt })
      .pipe(
        tap((res) => {
          if (roles) {
            for (const role of roles) {
              if (!res.roles?.includes(role)) {
                this.logger.error('The user does not have valid roles.');
                throw new UnauthorizedException();
              }
            }
          }
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }
}

import {CanActivate, ExecutionContext, Inject} from "@nestjs/common";
import {AUTH_SERVICE} from "@app/common/constants/services";
import {ClientProxy} from "@nestjs/microservices";
import {map, Observable, tap} from "rxjs";
import {UserDto} from "@app/common/dto";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

export class JwtAuthGuard implements CanActivate {

    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
        if (!jwt) return false;

        return this.authClient.send<UserDto>('authenticate', {Authentication: jwt,})
            .pipe(
                tap((res) => {
                context.switchToHttp().getRequest().user = res
                }),
            map(() => true),
            catchError(() => of(false))
            );
    }

}

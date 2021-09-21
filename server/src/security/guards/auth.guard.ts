import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
    logger = new Logger('authGuard');

    canActivate(context: ExecutionContext): any {
        return super.canActivate(context.getType() === 'http' ? context : GqlExecutionContext.create(context));
    }

    getRequest(context): any {
        return context.getType() === 'http' ? context.switchToHttp().getRequest() : context.getContext().req;
    }
}

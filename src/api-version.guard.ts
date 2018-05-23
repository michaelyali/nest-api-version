import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApiVersionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const versions = this.reflector.get<string[]>(
      'apiVersion',
      ctx.getHandler(),
    );

    if (!versions || !versions.length) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest();
    // Express or Fastify
    const url = (request.url as string) || (request.raw.url as string);

    return versions.some((version) => url.indexOf(`/${version}/`) === 0);
  }
}

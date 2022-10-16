import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../user/entities/role.enum';
import { OidcToken } from './interfaces/oidc.token';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.getRoles(context);
    if (roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }
    return this.matchRoles(roles, user);
  }

  private getRoles(context: ExecutionContext): Role[] {
    const fromClass = this.reflector.get<Role[]>(ROLES_KEY, context.getClass());
    const fromMethod = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    return fromMethod ?? fromClass ?? [];
  }

  private matchRoles(requestRoles: Role[], oidcToken: OidcToken): boolean {
    const userRoles = oidcToken.user.roles;
    return requestRoles.filter((role) => userRoles.includes(role)).length > 0;
  }
}

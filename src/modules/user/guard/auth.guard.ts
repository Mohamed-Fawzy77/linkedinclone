import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

Injectable();
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authToken = request.headers['authorization'];
    if (!authToken) {
      throw new UnauthorizedException('auth.UNAUTHORIZED');
    }
    try {
      request.user = this.jwtService.verify(authToken);
    } catch (error) {
      throw new UnauthorizedException('auth.EXPIRED_TOKEN_PLEASE_RELOG');
    }
    return true;
  }
}

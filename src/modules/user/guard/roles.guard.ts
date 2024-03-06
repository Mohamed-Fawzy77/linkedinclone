import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
// import { Roles } from '../decorator/role.decorator';

Injectable();
export class RolesGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Inside Roles Guard');
    // const roles = this.reflactor.get(Roles, context.getHandler());
    // console.log(roles);
    return true;
  }
}

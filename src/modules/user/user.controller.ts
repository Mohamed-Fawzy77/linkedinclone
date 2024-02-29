/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getHello(@Param('id') id: number) {
    return this.userService.getUser(id);
  }
}

console.log(123);

//mysql database => server
//sequelize => orm
//add sequlize to the project

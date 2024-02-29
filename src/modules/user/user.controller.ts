/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { SignUpDto } from './dtos/signup.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getHello(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Post('/signup')
  create(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignUpDto) {
    return this.userService.signIn(signInDto);
  }
}

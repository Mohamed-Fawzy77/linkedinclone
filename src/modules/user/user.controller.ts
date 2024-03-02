/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dtos/signup.dto';
import { UpdateUserDto } from './dtos/updateuser.dto';
import { SignInDto } from './dtos/signin.tdo';
import { IsNumber, IsInt } from 'class-validator';

export class AgeDto {
  @IsInt()
  firstUserId: number;

  @IsInt()
  secondUserId: number;

  @IsNumber()
  amount: number;
}

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post('/signup')
  create(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Patch('/update/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch('/age')
  updateAge(@Body() ageDto: AgeDto) {
    return this.userService.addAgeToUsers(
      ageDto.firstUserId,
      ageDto.secondUserId,
      ageDto.amount,
    );
  }
}

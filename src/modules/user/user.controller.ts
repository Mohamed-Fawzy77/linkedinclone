import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dtos/signup.dto';
import { UpdateUserDto } from './dtos/updateuser.dto';
import { SignInDto } from './dtos/signin.tdo';
// import { Roles } from './decorator/role.decorator';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { User } from './user.model';

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
  // @Roles(['user', 'admin'])
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Patch('/update')
  updateUser(@Body() updateUserDto: UpdateUserDto, @AuthUser() user: User) {
    return this.userService.updateUser(user, updateUserDto);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}

import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.tdo';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/updateuser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
  async getUser(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      return 'User not found';
    }

    const response: any = {
      user,
    };
    if (user.age) {
      const isAdult = user.age.toString();
      response.isAdult = isAdult;
    }

    return response;
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = await User.findOne({
        where: {
          email: signUpDto.email,
        },
      });
      if (user) return 'User already exists';

      const hashPassword = await bcrypt.hash(signUpDto.password, 5);

      const newUser: User = await User.create({
        ...signUpDto,
        password: hashPassword,
      } as unknown as User);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await User.findOne({
        where: {
          email: signInDto.email,
        },
      });
      if (!user) return 'User not found';

      const token = await this.jwtService.signAsync(
        {
          email: user.email,
          id: user.id,
          name: user.name,
        },
        { secret: process.env.JWT_SECRET },
      );

      const isMatch = await bcrypt.compare(signInDto.password, user.password);

      if (isMatch && user.email === signInDto.email)
        return { message: 'Signed Up successfully', token };

      return 'Wrong password or email';
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await User.findByPk(id);

    if (!user) return 'User not found';

    const hashPassword = await bcrypt.hash(updateUserDto.password, 5);

    const checkUserExist = await User.findOne({
      where: {
        email: updateUserDto.email,
      },
    });
    if (checkUserExist) return 'User already exists';

    await user.update({
      ...updateUserDto,
      password: hashPassword,
    });
    return 'updated successfully';
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id);

    if (!user) return 'User not found';
    await user.destroy();
    return 'deleted successfully';
  }
}

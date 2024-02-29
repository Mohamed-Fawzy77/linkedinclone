/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { SignUpDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async getUser(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      return 'no user found';
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
      if (user) throw new Error('User already exists');

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

  async signIn(signInDto: SignUpDto) {
    try {
      const user = await User.findOne({
        where: {
          email: signInDto.email,
        },
      });
      if (!user) throw new Error('User not found');

      const isMatch = await bcrypt.compare(signInDto.password, user.password);

      if (isMatch && user.email === signInDto.email)
        return 'Signed Up successfully';

      throw new Error('Wrong password or email');
    } catch (error) {
      console.log(error);
    }
  }
}

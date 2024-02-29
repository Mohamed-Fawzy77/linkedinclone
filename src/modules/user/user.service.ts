/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dtos/signup.dto';
import { SignUpEntity } from './entities/user.entity';

// const x ={hamdy: sayed}
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
  async signUp(signUp: SignUpDto) {
    try {
      const user = await User.findOne({ where: { email: signUp.email } });
      if (user) {
        throw new Error('user already exists');
      }
      const hashedPassword = await bcrypt.hashSync(signUp.password, 5);
      const newUser: SignUpEntity = await User.create({
        ...signUp,
        password: hashedPassword,
      } as User);
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }
}
//fasd

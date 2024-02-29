/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user.model';

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
}
//fasd

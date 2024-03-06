import { IsString, IsEmail } from 'class-validator';

export class SignInDto {
  username(username: any, password: string) {
    throw new Error('Method not implemented.');
  }
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

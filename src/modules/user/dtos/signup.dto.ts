import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(3, 20)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsNumber()
  readonly age: number | null;
}

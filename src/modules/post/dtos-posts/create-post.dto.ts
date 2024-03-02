/* eslint-disable prettier/prettier */
import { IsNumber, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  readonly userId: number;

  @IsString()
  @Length(5, 100)
  readonly title: string;

  @IsString()
  @Length(5, 1000)
  readonly content: string;
}

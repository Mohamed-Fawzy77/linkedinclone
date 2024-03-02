/* eslint-disable prettier/prettier */
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({ tableName: 'Post' })
export class Post extends Model<Post> {
  @Column
  title: string;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

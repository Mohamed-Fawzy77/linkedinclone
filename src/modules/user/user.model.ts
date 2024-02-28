import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'User', paranoid: true })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  age: number | null;
}

//createdAt, updatedAt, deletedAt
//nosql => schemaless
//sql => schema full

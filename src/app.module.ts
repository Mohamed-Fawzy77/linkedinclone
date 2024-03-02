/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/user.model';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/post.model';

const models = [User, Post];
const modules = [UserModule, PostModule];

@Module({
  imports: [
    ...modules,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.PORT!),
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATA_BASE,
      password: process.env.DATABASE_PASSWORD,
      models,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

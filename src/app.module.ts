/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/user.model';
import { UserModule } from './modules/user/user.module';

const models = [User];
const modules = [UserModule];

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

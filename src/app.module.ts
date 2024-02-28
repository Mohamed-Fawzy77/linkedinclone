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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'linkedin',
      models,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

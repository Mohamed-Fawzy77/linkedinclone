require('dotenv').config({ debug: true });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Req, Res, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './modules/user/guard/auth.guard';
import { RolesGuard } from './modules/user/guard/roles.guard';
// import { Roles } from './modules/user/decorator/role.decorator';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard());

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(3000);
}
bootstrap();

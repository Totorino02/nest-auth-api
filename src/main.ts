import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bodyParser: true});
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  app.use(bodyParser.json())
  await app.listen(3333);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeCustoms } from './config/validationPipeCustom';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation pipe custom config
  app.useGlobalPipes(new ValidationPipe(validationPipeCustoms));

  // enable cors
  app.enableCors();

  // somewhere in your initialization file
  app.use(helmet());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();

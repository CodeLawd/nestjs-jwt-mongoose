import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());

  // SET VERSION FOR API
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  });

  // SET GLOBAL VARIABLES FOR VALIDATION PIPES
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(8080);
}

bootstrap();

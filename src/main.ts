import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/exceptions/filters/http-exception.filter';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const version = process.env.API_VERSION || 'v1';
  const defaultVersion = process.env.DEFAULT_API_VERSION || '1';

  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: version,
    defaultVersion: defaultVersion,
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();

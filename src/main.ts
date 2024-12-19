import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http/http-exception.filter';
import { Env } from './infrastructure/config/env.config';
import { document } from './infrastructure/config/swagger.config';

const configService = new ConfigService<Env>();
const logger = new Logger();

async function bootstrap() {
  const port: number = configService.get<number>('PORT') as unknown as number;
  const defaultVersion = configService.get<string>(
    'DEFAULT_API_VERSION',
  ) as unknown as string;

  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion,
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(configService));
  app.enableCors({
    origin: '*',
  });
  const documentFactory = () => SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/docs', app, documentFactory);

  await app.listen(port, () => {
    logger.log(`Application is running on port ${port}`);
  });
}
bootstrap().catch((error) => {
  error;
});

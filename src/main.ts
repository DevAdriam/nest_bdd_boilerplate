import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { document } from './infrastructure/config/swagger.config';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const defaultVersion = process.env.DEFAULT_API_VERSION || '1';

  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion,
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const documentFactory = () => SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/docs', app, documentFactory);

  await app.listen(port, () => {
    console.log(`Application started on port ${port} successfully...🚀`);
  });
}
bootstrap();

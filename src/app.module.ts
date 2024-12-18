import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BadRequestExceptionFilter } from './core/filters/http/bad-request-exception.filter';
import { ForbiddenExceptionFilter } from './core/filters/http/forbidden-exception.filter';
import { HttpExceptionFilter } from './core/filters/http/http-exception.filter';
import { NotFoundExceptionFilter } from './core/filters/http/not-found-exception.filter';
import { UnauthorizedExceptionFilter } from './core/filters/http/unauthorized-exception.filter';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { ConfigModule } from './infrastructure/config/config.module';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { MailModule } from './infrastructure/mail/mail.module';
import { AppController } from './presentation/controllers/app.controller';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    PassportModule,
    JwtModule,
    PresentationModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

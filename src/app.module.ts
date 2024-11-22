import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from './infrastructure/config/config.module';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { MailModule } from './infrastructure/mail/mail.module';
import { AppController } from './presentation/controllers/app.controller';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: '',
    }),
    MailModule,
    PassportModule,
    PresentationModule,
    PrismaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

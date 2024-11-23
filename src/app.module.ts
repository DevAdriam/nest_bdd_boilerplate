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
    MailModule,
    PassportModule,
    JwtModule,
    PresentationModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

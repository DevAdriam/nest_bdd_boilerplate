import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '../config/config.module';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule, ConfigModule],
  providers: [MailService, Object],
})
export class MailModule {}

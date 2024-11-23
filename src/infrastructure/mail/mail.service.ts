import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { Env } from '../config/env.config';
import { verifyEmail } from './templates/otp-verify';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly gmailUser: string;
  private readonly gmailPassword: string;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService<Env>) {
    this.logger.log('mail service initialized');
    this.gmailUser = this.configService.get<string>('GMAIL_USER')!;
    this.gmailPassword = this.configService.get<string>('GMAIL_PASS')!;
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.gmailUser,
        pass: this.gmailPassword,
      },
    });

    this.transporter.verify((error) => {
      if (error) {
        this.logger.error('Transporter Error: ', error);
      } else {
        this.logger.log('Trasporter is ready to send email 🚀');
      }
    });
  }

  async sendVerification(code: string, to: string) {
    try {
      await this.transporter.sendMail({
        from: this.gmailUser,
        to,
        subject: 'OTP Verification',
        html: verifyEmail(code),
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException({
        message: 'Failed to send email',
      });
    }
  }
}

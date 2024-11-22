import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Env } from 'src/infrastructure/config/env.config';

@Injectable()
export class HashService {
  constructor(private readonly confgiService: ConfigService<Env>) {}

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.confgiService.get<number>('HASH_ROUND')!);
  }

  compare(value: string, encryptedValue: string): Promise<boolean> {
    return bcrypt.compare(value, encryptedValue);
  }
}

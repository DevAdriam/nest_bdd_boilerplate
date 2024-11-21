import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private SALT_ROUND: 10;
  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT_ROUND);
  }

  compare(value: string, encryptedValue: string): Promise<boolean> {
    return bcrypt.compare(value, encryptedValue);
  }
}

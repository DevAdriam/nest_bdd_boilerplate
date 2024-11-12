import type { User, USER_STATUS } from '@prisma/client';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';

export class UserEntity {
  private phone: string;
  private email: string;
  private name: string;
  private status: USER_STATUS;

  constructor(user: User) {
    this.email = user.email;
    this.phone = user.phone;
    this.name = user.name;
    this.status = user.status;
  }

  getEmail(role): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getName(): string {
    return this.name;
  }

  getStatus(): USER_STATUS {
    return this.status;
  }

  //business Logic
  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  updatePassword(newPassword: string) {
    if (newPassword.length < 6) {
      throw new BadRequestException({
        message: 'password must be greater than 6',
      });
    }
  }

  suspend(): void {
    this.status = 'SUSPENDED';
  }
}

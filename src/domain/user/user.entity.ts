import type { Prisma, User, USER_STATUS } from '@prisma/client';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';

export class UserEntity {
  private phone: string;
  private email: string;
  private name: string;
  private status: USER_STATUS;
  private password: string;

  constructor({
    email,
    phone,
    name,
    status,
  }: {
    email: string;
    phone: string;
    name: string;
    status: USER_STATUS;
  }) {
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.status = status;
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
  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  updatePassword(newPassword: string) {
    if (newPassword.length < 6) {
      throw new BadRequestException({
        message: 'password must be greater than 6',
      });
    }
    this.password = newPassword;
  }

  hashPassword() {}

  suspend(): void {
    this.status = 'SUSPENDED';
  }

  toPersistance(): Prisma.UserCreateInput {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      status: this.status,
      phone: this.phone,
    };
  }
}

import { Injectable } from '@nestjs/common';
import type { Prisma, USER_STATUS } from '@prisma/client';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';

@Injectable()
export class UserEntity {
  private phone: string | undefined | null;
  private email: string | undefined | null;
  private name: string;
  private status: USER_STATUS;
  private password: string;
  private id: string | null | undefined;

  constructor({
    email,
    phone,
    name,
    status,
    id,
  }: {
    email?: string | undefined | null;
    phone?: string | undefined | null;
    id?: string | null | undefined;
    name: string;
    status: USER_STATUS;
  }) {
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.status = status;
    this.id = id;
  }

  getPhone(): string | null | undefined {
    return this.phone;
  }

  getId(): string | null | undefined {
    return this.id;
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
    return emailRegex.test(this.email as string);
  }

  updatePassword(newPassword: string) {
    if (newPassword.length < 6) {
      throw new BadRequestException({
        message: 'password must be greater than 6',
      });
    }
    this.password = newPassword;
  }

  suspend(): void {
    this.status = 'SUSPENDED';
  }

  active(): void {
    this.status = 'ACTIVE';
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

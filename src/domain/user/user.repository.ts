import { Prisma, User, USER_STATUS } from '@prisma/client';
import { UserRepositoryInterface } from './user.repository.interface';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { UpdateUserDto } from 'src/application/user/dto/update.user.dto';
import { RegisterDto } from 'src/application/auth/dto/register.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly dbService: PrismaService) {}
  async findById(id: string): Promise<User> {
    return this.dbService.user
      .findUnique({ where: { id } })
      .then((res) => res)
      .catch((err) => err);
  }

  async findByEmail(email: string): Promise<User> {
    return this.dbService.user
      .findFirst({ where: { email } })
      .then((res) => res)
      .catch((err) => err);
  }

  async findAll(page: number, size: number): Promise<User[]> {
    return this.dbService.user
      .findMany({
        where: { status: { not: 'DELETED' } },
        take: size,
        skip: page,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  async create(dto: RegisterDto): Promise<User> {
    return this.dbService.user
      .create({
        data: {
          name: dto.name,
          email: dto.email,
          password: dto.password,
          phone: dto.phone,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  async update(dto: UpdateUserDto, userId: string): Promise<User> {
    return this.dbService.user
      .update({
        where: {
          id: userId,
        },
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async updateStatus(status: USER_STATUS, userId: string): Promise<User> {
    return this.dbService.user
      .update({
        where: {
          id: userId,
        },
        data: {
          status,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }
}

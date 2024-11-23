import { Injectable } from '@nestjs/common';
import { Prisma, User, USER_STATUS } from '@prisma/client';
import { UpdateUserDto } from 'src/application/user/dto/update.user.dto';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { UserRepositoryInterface } from './user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly databaseService: PrismaService) {}
  async findById(id: string): Promise<User | null> {
    return await this.databaseService.user.findUnique({
      where: { id, status: 'ACTIVE' },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.databaseService.user.findFirst({
      where: { email },
    });
  }

  async findAll(page: number, size: number): Promise<User[] | []> {
    return await this.databaseService.user.findMany({
      where: { status: { not: 'DELETED' } },
      take: size,
      skip: page,
    });
  }
  async create(dto: Prisma.UserCreateInput): Promise<User | null> {
    return await this.databaseService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
        phone: dto.phone,
      },
    });
  }
  async update(dto: UpdateUserDto, userId: string): Promise<User | null> {
    return await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
      },
    });
  }

  async updateStatus(
    status: USER_STATUS,
    userId: string,
  ): Promise<User | null> {
    return await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        status,
      },
    });
  }
}

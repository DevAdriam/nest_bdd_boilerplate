import { User } from '@prisma/client';

export interface UserRepositoryInterface {
  findById(id: string): Promise<User>;
  findAll(page: number, size: number): Promise<User[]>;
  create(): Promise<User>;
  update(): Promise<User>;
}

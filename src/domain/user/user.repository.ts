import { User } from '@prisma/client';
import { UserRepositoryInterface } from './user.repository.interface';

export class UserRepository implements UserRepositoryInterface {
  constructor() {}
  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(page: number, size: number): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  create(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

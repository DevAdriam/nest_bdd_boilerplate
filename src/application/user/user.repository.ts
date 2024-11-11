import { UserRepositoryInterface } from './user.repository.interface';

export class UserRepository implements UserRepositoryInterface {
  create(): string {
    throw new Error('Method not implemented.');
  }
  update(): string {
    throw new Error('Method not implemented.');
  }

  findAll(page: number, size: number): string {
    return '';
  }

  findById(id: string): string {
    return '';
  }
}

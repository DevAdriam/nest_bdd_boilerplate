import { User, USER_STATUS } from '@prisma/client';
import { RegisterDto } from 'src/application/auth/dto/register.dto';
import { UpdateUserDto } from 'src/application/user/dto/update.user.dto';

export interface UserRepositoryInterface {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(page: number, size: number): Promise<User[]>;
  create(dto: RegisterDto): Promise<User>;
  update(dto: UpdateUserDto, id: string): Promise<User>;
  updateStatus(status: USER_STATUS, id: string): Promise<User>;
}

import { User, USER_STATUS } from '@prisma/client';
import { RegisterDto } from 'src/application/auth/dto/register.dto';
import { UpdateUserDto } from 'src/application/user/dto/update.user.dto';

export interface UserRepositoryInterface {
  findById(id: string): Promise<User | null | undefined>;
  findByEmail(email: string): Promise<User | null | undefined>;
  findAll(page: number, size: number): Promise<User[] | []>;
  create(dto: RegisterDto): Promise<User | null | undefined>;
  update(dto: UpdateUserDto, id: string): Promise<User | null | undefined>;
  updateStatus(
    status: USER_STATUS,
    id: string,
  ): Promise<User | null | undefined>;
}

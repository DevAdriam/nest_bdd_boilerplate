import { Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserService } from 'src/application/user/user.service';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Patch('/suspend/:id')
  @ApiParam({
    name: 'id',
    example: 'bf93110b-7ce2-4b4b-9643-54555336d04b',
  })
  @HttpCode(201)
  async suspendUser(@Param('id') userId: string): Promise<User> {
    try {
      const suspendedUser = await this.userService.suspendUser(userId);
      return suspendedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException({
          message: error.message,
        });
      }

      throw new BadRequestException({
        message: 'Something went wrong',
      });
    }
  }
}

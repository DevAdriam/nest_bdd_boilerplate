import {  Controller, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { UserService } from 'src/application/user/user.service';
import { Responser } from 'src/common/types/type';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Patch('/suspend/:id')
  @HttpCode(201)
  async suspendUser(@Param('id') userId: string): Promise<Responser> {
    try {
      const suspendedUser = await this.userService.suspendUser(userId);
      return {
        _metaData: {
          message: 'Successfully suspended User',
          statusCode: 201,
        },
        _data: {
          data: suspendedUser,
        },
      };
    } catch (error) {
      throw new BadRequestException({
        message: error.message || 'Something went wrong',
      });
    }
  }
}

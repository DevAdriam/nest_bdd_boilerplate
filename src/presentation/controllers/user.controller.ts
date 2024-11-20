import { Controller, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { UserService } from 'src/application/user/user.service';
import { Responser } from 'src/common/types/type';
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

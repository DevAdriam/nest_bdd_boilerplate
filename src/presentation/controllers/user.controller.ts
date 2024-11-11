import { Controller, Patch } from '@nestjs/common';
import { UserDto } from 'src/application/user/dto/user.dto';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';

@Controller('user')
export class UserController {
  @Patch()
  suspendUser(dto: UserDto) {
    try {
    } catch (error) {
      throw new BadRequestException({
        message: error.message || 'Something went wrong',
      });
    }
  }
}

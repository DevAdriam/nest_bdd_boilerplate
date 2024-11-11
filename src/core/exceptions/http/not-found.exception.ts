import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomErrorCodes } from 'src/common/constants/custom-errorcode';

export class NotFoundException extends HttpException {
  constructor({ message, code }: { message: string; code?: CustomErrorCodes }) {
    super(
      {
        message,
        code,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomErrorCodes } from 'src/common/constants/custom-errorcode';

export class BadRequestException extends HttpException {
  constructor({ message, code }: { message: string; code?: CustomErrorCodes }) {
    super(
      {
        message,
        code,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';
import {
  customErrorCodes,
  CustomErrorCodes,
} from 'src/common/constants/custom-errorcode';

export class InvalidUserException extends HttpException {
  constructor({
    message,
    code = customErrorCodes.INVALID_USER,
  }: {
    message: string;
    code?: CustomErrorCodes;
  }) {
    super(
      {
        message,
        code,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

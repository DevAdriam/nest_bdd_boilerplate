import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { customErrorCodes } from 'src/common/constants/custom-errorcode';
import { Responser } from 'src/common/types/type';
import { UserArgs } from '@prisma/client/runtime/library';

@Controller()
export class AppController {
  @Get()
  getHello(): Responser {
    const hello = 'random';
    console.log('this is not used variable');
    return {
      _data: {
        data: 'hello',
      },
      _metaData: {
        message: 'Success',
        statusCode: HttpStatus.OK,
      },
    };
  }

  @Get('test-throw')
  throwEror() {
    throw new BadRequestException({
      message: 'wrong payload',
      code: customErrorCodes.INVALID_JSON,
    });
  }
}

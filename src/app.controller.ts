import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { BadRequestException } from './core/exceptions/http/bad-request.exception';
import { customErrorCodes } from './common/constants/custom-errorcode';
import { Responser } from './common/types/type';

@Controller('application')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Responser {
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

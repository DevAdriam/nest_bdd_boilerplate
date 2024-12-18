import { BadRequestException, Controller, Get } from '@nestjs/common';
import { customErrorCodes } from 'src/common/constants/custom-errorcode';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'hello';
  }

  @Get('test-throw')
  throwEror() {
    throw new BadRequestException({
      message: 'wrong payload',
      code: customErrorCodes.INVALID_JSON,
    });
  }
}

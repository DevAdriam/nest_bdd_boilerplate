import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { GlobalException } from 'src/common/types/type';
import { extractFeatureFromPath } from 'src/common/utils/extract-feature-from-path';
import { BadRequestException } from '../../exceptions/http/bad-request.exception';

@Catch(BadRequestException)
@Injectable()
export class BadRequestExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();
    const errorResponse: string | object = exception.getResponse();

    response.status(status).json({
      success: false,
      _metaData: {
        path: request.url,
        feature: extractFeatureFromPath(request.path), // api/v1/auth -> auth
        version: this.configService.get<string>('API_VERSION'),
        timeStamp: new Date().toISOString(),
        statusCode: HttpStatus.BAD_REQUEST,
      },
      _error: {
        code: errorResponse['code'] as number,
        cause: errorResponse['message'] as string,
      },
    } as GlobalException);
  }
}

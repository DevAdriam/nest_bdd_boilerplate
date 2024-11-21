import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalException } from 'src/common/types/type';
import { extractFeatureFromPath } from 'src/common/utils/extract-feature-from-path';
import { envConfig } from 'src/infrastructure/config/env.config';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
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
        version: envConfig.API_VERSION,
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

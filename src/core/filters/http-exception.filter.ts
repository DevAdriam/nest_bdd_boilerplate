import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalException } from 'src/common/types/type';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    res.status(status).json({
      success: false,
      _metaData: {
        path: req.url,
        feature: extractFeatureFromPath(req.path), // api/v1/auth -> auth
        version: process.env.API_VERSION,
        timeStamp: new Date().toISOString(),
        statusCode: HttpStatus.BAD_REQUEST,
      },
      _error: {
        code: errorResponse['code'],
        cause: errorResponse['message'],
      },
    } as GlobalException);
  }
}

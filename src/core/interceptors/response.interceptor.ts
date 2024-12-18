import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';
import {
  IPaginate,
  IPaginatedResponse,
  IResponse,
} from 'src/common/types/type';

export class ResponseInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = ctx.switchToHttp().getRequest();
    const statusCode =
      request.method === 'GET' ? HttpStatus.OK : HttpStatus.CREATED;
    const size = request.query['size'];
    const page = request.query['page'];
    const isPaginatedResponse = !!(size && page);

    return next.handle().pipe(
      map(
        (
          data: Record<string, unknown> | Array<unknown> | IPaginate<unknown>,
        ) => {
          if (data) {
            return isPaginatedResponse && this.isPaginateDataValid(data)
              ? ({
                  success: true,
                  _metaData: {
                    message: 'Success',
                    statusCode,
                  },
                  _pagination: {
                    pageSize: +size,
                    totalCount: data.totalCount,
                    totalPages: Math.ceil(data.totalCount / +size),
                  },
                  _data: {
                    data: data.list,
                  },
                } satisfies IPaginatedResponse)
              : ({
                  success: true,
                  _metaData: {
                    message: 'Success',
                    statusCode,
                  },
                  _data: {
                    data: data,
                  },
                } as IResponse);
          }
        },
      ),
    );
  }

  private isPaginateDataValid(data: unknown): data is IPaginate<unknown> {
    return !!(
      data &&
      data['totalCount'] &&
      data['list'] &&
      typeof data['totalCount'] === 'number' &&
      Array.isArray(data['list'])
    );
  }
}

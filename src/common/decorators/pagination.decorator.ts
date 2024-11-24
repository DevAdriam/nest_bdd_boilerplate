import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { PaginationParam } from '../types/type';

export const Pagination = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();

    const page = request.query['page']! as unknown as number;
    const pageSize = request.query['size'] as unknown as number;

    if (pageSize > 1000) {
      throw new BadRequestException({
        message: 'request amount too much',
      });
    }

    return {
      take: pageSize,
      skip: (page - 1) * pageSize,
    } as PaginationParam;
  },
);

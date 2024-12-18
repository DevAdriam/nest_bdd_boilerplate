import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '../exceptions/http/bad-request.exception';

export class validateIdPipe implements PipeTransform {
  transform(value: string, _: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException({
        message: 'id must not be null',
      });
    }
    return value;
  }
}

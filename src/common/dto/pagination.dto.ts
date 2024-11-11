import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    type: 'string',
    default: 1,
  })
  page: number;

  @ApiProperty({
    type: 'string',
    default: 10,
  })
  size: number;

  @ApiPropertyOptional({
    type: 'string',
  })
  search: string;
}

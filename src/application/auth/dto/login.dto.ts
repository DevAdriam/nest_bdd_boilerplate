import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiPropertyOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  password: string;
}

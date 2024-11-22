import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsString()
  password: string;
}

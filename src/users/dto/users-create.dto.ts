import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ description: 'User login.' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9_.-]+$/)
  @Expose()
  login: string;

  @ApiProperty({ description: 'User password.' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(8)
  @Expose()
  password: string;

  @ApiPropertyOptional({ description: 'User email.' })
  @IsString()
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  @Expose()
  email?: string;
}

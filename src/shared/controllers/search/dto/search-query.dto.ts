import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export abstract class SearchQueryDto {
  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  itemsPerPage?: number = 20;

  @ApiPropertyOptional({ type: [String] })
  @Expose()
  sortBy?: string | string[];
}

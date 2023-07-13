import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SearchQueryDto } from '../../shared/controllers';

export class UsersQueryDto extends SearchQueryDto {
  @ApiPropertyOptional({ name: 'login', type: 'String' })
  @Expose()
  login?: string;

  @ApiPropertyOptional({ name: 'name', type: 'String' })
  @Expose()
  email?: string;
}

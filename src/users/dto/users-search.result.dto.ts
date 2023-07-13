import { ApiProperty } from '@nestjs/swagger';

export class UsersSearchResult {
  @ApiProperty()
  id: number;
  @ApiProperty()
  login: string;
  @ApiProperty()
  email: string;
}

export class UsersSearchResultDto {
  @ApiProperty({ description: 'Number of page you are looking for' })
  page: number;
  @ApiProperty({ description: 'Number of entities on one page' })
  itemsPerPage: number;
  @ApiProperty({ type: [UsersSearchResult], description: 'The entity you are looking for' })
  records: UsersSearchResult[];
  @ApiProperty({ description: 'Number of pages known for the current request' })
  pages?: number;
}

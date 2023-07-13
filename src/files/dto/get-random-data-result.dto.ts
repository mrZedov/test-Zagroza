import { ApiProperty } from '@nestjs/swagger';

export class GetRandomDataResultDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}

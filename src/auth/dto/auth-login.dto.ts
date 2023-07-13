import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: true, description: 'username' })
  username: string;
  @ApiProperty({ required: true, description: 'password' })
  password: string;
}

export class RefreshDto {
  @ApiProperty({ required: true, description: 'refresh token' })
  refreshToken: string;
}

import { ApiProperty } from '@nestjs/swagger';
export class LoginUserResponseDto {
  @ApiProperty({ example: 'ey.asdfasdfasdf.eyasdfasdfsadf.asdfasdfasdf' })
  access_token: string;

  @ApiProperty({ example: 'JWT' })
  token_type: 'JWT';

  @ApiProperty({ example: 123456 })
  expires_in: number;

  @ApiProperty({ example: 1234 })
  user_id: number;
}

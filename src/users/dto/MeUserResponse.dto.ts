import { ApiProperty } from '@nestjs/swagger';

export class MeUserResponseDto {
  @ApiProperty({ example: 1234 })
  userId: number;

  @ApiProperty({ example: 'john' })
  username: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { LoginUserDto } from './LoginUser.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({ example: 'Pedro' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Suarez' })
  @IsString()
  @IsNotEmpty()
  lastname: string;
}

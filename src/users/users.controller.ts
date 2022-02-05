import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserI } from './user.interface';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { LoginUserResponseDto } from './dto/LoginUserResponse.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async create(@Body() createdUserDto: CreateUserDto): Promise<UserI> {
    return await this.usersService.create(createdUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() LoginUserDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    return await this.usersService.login(LoginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async userData(@Req() request): Promise<any> {
    const session = await this.usersService.sessionData(request);
    return session.user;
  }
}

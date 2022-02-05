import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { UserI } from './user.interface';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async create(@Body() createdUserDto: CreateUserDto): Promise<UserI> {
    return await this.usersService.create(createdUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() LoginUserDto: LoginUserDto): Promise<string> {
    return await this.usersService.login(LoginUserDto);
  }

  @Get('/me')
  userData() {
    return { user: 'user data' };
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/register')
  register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
  ) {
    return { username, password, firstname, lastname };
  }

  @Post('/login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return { username, password };
  }

  @Get('/me')
  userData() {
    return { user: 'user data' };
  }
}

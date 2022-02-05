import { Controller, Patch, Body, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Patch(':id')
  update(
    @Param('id') userId: number,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
  ) {
    return { userId, username, password, firstname, lastname };
  }
}

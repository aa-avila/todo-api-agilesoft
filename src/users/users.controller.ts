import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserI } from './user.interface';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { LoginUserResponseDto } from './dto/LoginUserResponse.dto';
import { MeUserResponseDto } from './dto/MeUserResponse.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Auth users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    type: LoginUserResponseDto,
    description: 'User created',
  })
  @Post('/register')
  async create(@Body() createdUserDto: CreateUserDto): Promise<UserI> {
    return await this.usersService.create(createdUserDto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    type: LoginUserResponseDto,
    description: 'Logged in successfully',
  })
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() LoginUserDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    return await this.usersService.login(LoginUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user data from current session' })
  @ApiResponse({
    status: 200,
    type: MeUserResponseDto,
    description: 'User info',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async userData(@Req() request): Promise<any> {
    const session = await this.usersService.sessionData(request);
    return session.user;
  }
}

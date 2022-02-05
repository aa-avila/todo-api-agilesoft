import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { User } from './user.entity';
import { UserI } from './user.interface';
import { LoginUserResponseDto } from './dto/LoginUserResponse.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(createdUserDto: CreateUserDto): Promise<UserI> {
    const userExists = await this.usernameExists(createdUserDto.username);
    if (userExists) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    const passwordHash = await this.authService.hashPassword(
      createdUserDto.password,
    );
    createdUserDto.password = passwordHash;
    const newUser = this.usersRepository.create(createdUserDto);
    const { password, ...savedUser } = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const user = await this.findByUsername(loginUserDto.username);
    if (!user) {
      throw new HttpException('Username not found', HttpStatus.NOT_FOUND);
    }

    const passMatch = await this.validatePassword(
      loginUserDto.password,
      user.password,
    );
    if (!passMatch) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const userPayload = {
      userId: user.id,
      username: user.username,
    };

    const jwtToken = await this.authService.generateJwt(userPayload);
    return {
      access_token: jwtToken,
      token_type: 'JWT',
      expires_in: 10000,
      user_id: user.id,
    };
  }

  private async findByUsername(username: string): Promise<UserI> {
    return await this.usersRepository.findOne(
      { username },
      { select: ['id', 'username', 'password'] },
    );
  }

  private async usernameExists(username: string): Promise<boolean> {
    const user: UserI = await this.usersRepository.findOne({ username });

    if (user) {
      return true;
    } else {
      return false;
    }
  }

  private async validatePassword(
    password: string,
    dbPassword: string,
  ): Promise<boolean> {
    return await this.authService.comparePasswords(password, dbPassword);
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');
import { UserI } from 'src/users/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: {
    userId: number;
    username: string;
  }): Promise<string> {
    return await this.jwtService.signAsync({ user });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, dbPassword: string): Promise<any> {
    return await bcrypt.compare(password, dbPassword);
  }
}

import { Injectable } from '@nestjs/common';
// import { Observable, from } from 'rxjs';

import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, dbPassword: string): Promise<any> {
    return await bcrypt.compare(password, dbPassword);
  }
}

import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';

import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePasswords(password: string, dbPassword: string): Observable<any> {
    return from(bcrypt.compare(password, dbPassword));
  }
}

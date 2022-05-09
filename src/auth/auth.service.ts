import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(): string {
    return 'logged in';
  }

  signUp(): string {
    return 'signed up';
  }
}

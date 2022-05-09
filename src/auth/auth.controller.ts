import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  login(): string {
    return this.authService.login();
  }

  @Post('/signup')
  signup(): string {
    return this.authService.signUp();
  }
}

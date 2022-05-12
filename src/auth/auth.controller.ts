import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { UserDetails } from 'src/user/interfaces/user-details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDto): Promise<UserDetails> {
    return this.authService.signUp(user);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() user: ExistingUserDto): Promise<{ token: string }> {
    return this.authService.login(user);
  }
}

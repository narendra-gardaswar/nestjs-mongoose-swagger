import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { UserDetails } from 'src/user/interfaces/user-details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @ApiResponse({
    status: 201,
    description: 'The User has been successfully created.',
  })
  @ApiResponse({ status: 406, description: 'Not Acceptable' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('signup')
  async signUp(@Body() user: CreateUserDto): Promise<UserDetails> {
    return this.authService.signUp(user);
  }

  @ApiTags('Auth')
  @ApiResponse({
    status: 200,
    description: 'The User successfully Logged In.',
  })
  @ApiResponse({ status: 406, description: 'Not Acceptable' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post('login')
  @HttpCode(200)
  async login(@Body() user: ExistingUserDto): Promise<{ token: string }> {
    return this.authService.login(user);
  }
}

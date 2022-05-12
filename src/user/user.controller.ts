import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserDetails } from './interfaces/user-details.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDetails> {
    return await this.userService.findById(id);
  }
}

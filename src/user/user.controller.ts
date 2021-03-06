import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserDetails } from './interfaces/user-details.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @ApiTags('Users')
  @ApiBearerAuth('access-token')
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDetails> {
    return await this.userService.findById(id);
  }
}

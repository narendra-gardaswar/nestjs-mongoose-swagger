import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ExistingUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty()
  readonly password: string;
}

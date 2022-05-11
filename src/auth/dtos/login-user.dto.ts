import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'username is required' })
  readonly username: string;

  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}

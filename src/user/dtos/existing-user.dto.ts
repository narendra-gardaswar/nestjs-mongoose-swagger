import { IsEmail, IsNotEmpty } from 'class-validator';

export class ExistingUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}

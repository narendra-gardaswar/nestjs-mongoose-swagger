import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @MaxLength(50, {
    message: 'First name Maximal length is 50 characters',
  })
  readonly name: string;

  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, {
    message: 'Password Too short, minimum length is 8 characters',
  })
  @MaxLength(22, {
    message: 'Password Too short, Maximal length is 8 characters',
  })
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'password must include at least one uppercase, lowercase, number and special character',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'Confirm Password is required' })
  @IsString()
  readonly confirmPassword: string;
}

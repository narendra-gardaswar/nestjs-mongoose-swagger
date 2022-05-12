import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { UserDetails } from 'src/user/interfaces/user-details.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserDetails> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;
    if (!doesUserExist) throw new NotFoundException('Invalid Email');

    const isPasswordValid = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    return this.userService._getUserDetials(user);
  }

  async signUp(user: Readonly<CreateUserDto>): Promise<UserDetails> {
    let { name, email, password } = user;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) throw new NotAcceptableException('Email already in use');
    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.createUser(
      name,
      email,
      hashedPassword,
    );

    return this.userService._getUserDetials(newUser);
  }

  async login(existingUser: ExistingUserDto): Promise<{ token: string }> {
    let { email, password } = existingUser;
    const user = await this.validateUser(email, password);
    if (!user.id) throw new BadRequestException('Invalid email or password');
    const token = await this.jwtService.signAsync({ user });
    return { token: token };
  }
}

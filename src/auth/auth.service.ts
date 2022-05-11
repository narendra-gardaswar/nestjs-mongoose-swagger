import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from './schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    let { name, username, password, confirmPassword } = createUserDto;
    if (password !== confirmPassword)
      throw new NotAcceptableException('password does not match');
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser)
      throw new NotAcceptableException('Username already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const usernameLower = username.toLowerCase();
    const user = new this.userModel({
      name,
      username: usernameLower,
      password: hashedPassword,
    });
    const userData = await user.save();
    if (!userData)
      throw new InternalServerErrorException('Failed to create user');
    return {
      response: 'user Created',
      userId: userData._id,
      username: userData.username,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    let { username, password } = loginUserDto;
    const user = await this.userModel.findOne({ username });

    if (!user) throw new NotFoundException('could not find the user');
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new BadRequestException('Incorrect Password');
    return {
      response: 'user logged in',
      userId: user.id,
      userName: user.username,
    };
  }
}

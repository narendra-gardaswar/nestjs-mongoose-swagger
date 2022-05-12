import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './interfaces/user-details.interface';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetials(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return this._getUserDetials(user);
  }

  async createUser(
    name: string,
    email: string,
    hashPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({ name, email, password: hashPassword });
    return await newUser.save();
  }
}

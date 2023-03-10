import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument, User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers() {
    return await this.userModel.find().lean().select('-password');
  }

  async getUserWithId(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user)
      throw new NotFoundException(`User with id of ${userId} not found`);
    return user;
  }
}

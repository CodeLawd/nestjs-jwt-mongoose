import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
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
    return await this.userModel.findById(userId).select('-password');
  }
}

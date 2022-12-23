import { RegisterDTO } from './dto/auth.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './../users/schema/user.schema';
import { Admin, AdminDocument } from './../admin/schema/admin.schema';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  // Validate a user
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email: username });
    if (!user) throw new NotFoundException('Email does not exists');

    const isMatch = await argon.verify(user.password, password);
    if (!isMatch) throw new ForbiddenException('Invalid Credentials');

    if (user && isMatch) return user;

    return null;
  }

  async sendUserWithToken(user: any) {
    const payload = { username: user.email, sub: user._id };
    delete user.password;
    return {
      access_token: this.jwtService.sign(payload),
      data: user,
    };
  }

  async register(registerDTO: RegisterDTO) {
    const { password, email, ...rest } = registerDTO;

    // Check if email already exists
    const isRegistered = await this.userModel.findOne({ email });
    if (isRegistered)
      throw new ForbiddenException('Email is already registred');

    // Hash users password
    const hash = await argon.hash(password);

    // Save user
    const user = await this.userModel.create<RegisterDTO>({
      ...rest,
      email,
      password: hash,
    });

    if (user) {
      delete user.password;
      return user;
    }

    return user;
  }
}

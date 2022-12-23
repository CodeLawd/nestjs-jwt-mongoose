import { Public } from './../auth/passport/public';
import { UsersService } from './users.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:userId')
  getUserWithId(@Param('userId') userId: string) {
    return this.userService.getUserWithId(userId);
  }
}

import { Public } from './../auth/passport/public';
import { UsersService } from './users.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from 'src/common/utils/roles.decorator';
import { Role } from 'src/common/utils/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:userId')
  getUserWithId(@Param('userId') userId: string) {
    return this.userService.getUserWithId(userId);
  }
}

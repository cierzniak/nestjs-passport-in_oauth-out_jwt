import { Controller, Get, Param, Query, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, Role } from '../auth/roles.decorator';

@Roles(Role.administrator)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(@Query('page') page = 1) {
    return this.userService.findAll(page);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Roles(Role.superadministrator)
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }
}

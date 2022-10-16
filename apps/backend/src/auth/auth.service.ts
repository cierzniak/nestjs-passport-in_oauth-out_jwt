import { Injectable } from '@nestjs/common';
import { UserinfoResponse } from 'openid-client';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async fetchUser(user: UserinfoResponse): Promise<User> {
    let entity;
    try {
      entity = await this.userService.getByEmail(user.email);
    } catch (exception) {
      entity = await this.createUser(user);
    }
    return await this.updateUser(entity, user);
  }

  private async createUser(user: UserinfoResponse): Promise<User> {
    const name = user.name.split(' ');
    return await this.userService.create(
      new CreateUserDto(name.shift(), name.pop(), user.email),
    );
  }

  private async updateUser(
    entity: User,
    user: UserinfoResponse,
  ): Promise<User> {
    const name = user.name.split(' ');
    return await this.userService.update(
      entity.id,
      new UpdateUserDto({
        firstName: name.shift(),
        lastName: name.pop(),
        lastLoginAt: new Date(),
      }),
    );
  }
}

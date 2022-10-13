import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor(data: Partial<User> = {}) {
    super();
    Object.assign(this, data);
  }

  @IsDate()
  readonly lastLoginAt: Date;
}

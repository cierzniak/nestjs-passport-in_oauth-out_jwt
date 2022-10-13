import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../entities/role.enum';

export class CreateUserDto {
  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsEnum(Role, { each: true })
  readonly roles?: Role[];
}

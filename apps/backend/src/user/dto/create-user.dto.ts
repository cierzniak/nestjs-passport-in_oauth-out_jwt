import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../entities/role.enum';

export class CreateUserDto {
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

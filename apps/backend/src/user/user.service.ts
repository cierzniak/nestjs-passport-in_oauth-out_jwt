import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuplicateResource, ResourceNotFound } from '../common/exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const email = await this.userRepository.findOneBy({ email: user.email });
    if (email) {
      // TODO Find way of throwing domain exception instead of HTTP one
      throw new DuplicateResource();
    }
    const entity = this.userRepository.create(user);
    return this.userRepository.save(entity);
  }

  async findAll(page: number) {
    const pageSize = 20;

    const [data, totalSize] = await this.userRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: {
        lastName: 'ASC',
      },
      select: ['id', 'firstName', 'lastName', 'active'],
    });
    return { data, meta: { page: Number(page), pageSize, totalSize } };
  }

  async findOne(id: string) {
    const entity = await this.userRepository.findOneBy({ id });
    // TODO Check this condition is needed
    if (!entity) {
      return null;
    }
    return entity;
  }

  async update(id: string, user: UpdateUserDto) {
    const entity = await this.userRepository.preload({ id, ...user });
    if (!entity) {
      throw new ResourceNotFound();
    }
    return this.userRepository.save(entity);
  }
}

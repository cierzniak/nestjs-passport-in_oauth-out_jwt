import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceNotFound } from '../common/domain.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const entity = this.userRepository.create(user);
    return await this.userRepository.save(entity);
  }

  async findAll(page: number) {
    const [data, totalSize] = await this.userRepository.findAndCount({
      take: this.configService.get('app.defaultPageSize'),
      skip: (page - 1) * this.configService.get('app.defaultPageSize'),
      order: {
        lastName: 'ASC',
      },
      select: ['id', 'firstName', 'lastName', 'lastLoginAt'],
    });
    return {
      data,
      meta: {
        page: Number(page),
        pageSize: this.configService.get('app.defaultPageSize'),
        totalSize,
      },
    };
  }

  async getById(id: string): Promise<User> {
    const entity = await this.userRepository.findOneBy({ id });
    if (!entity) {
      throw new ResourceNotFound();
    }
    return entity;
  }

  async getByEmail(email: string): Promise<User> {
    const entity = await this.userRepository.findOneBy({ email });
    if (!entity) {
      throw new ResourceNotFound();
    }
    return entity;
  }

  async update(id: string, user: UpdateUserDto) {
    const entity = await this.userRepository.preload({ id, ...user });
    if (!entity) {
      throw new ResourceNotFound();
    }
    return await this.userRepository.save(entity);
  }
}

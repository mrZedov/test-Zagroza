import { EntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserCreateDto } from '../dto/users-create.dto';
import { Users } from '../entities/users.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly repositoryUsers: EntityRepository<Users>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = process.env.USER_SALT || '';
    return crypto.createHash('sha256').update(`${password}${salt}`).digest('hex');
  }

  async findById(id: number): Promise<Users> {
    const user = await this.repositoryUsers.findOne({ id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByLogin(login: string): Promise<Users> {
    const user = await this.repositoryUsers.findOne({ $or: [{ login: login }, { email: login }], deleted: false });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<EntityData<Users>> {
    const user = await this.repositoryUsers.findOne({ email: email, deleted: false });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateUser(username: string, password: string): Promise<EntityData<Users>> {
    const user = await this.repositoryUsers.findOne({ $or: [{ login: username }, { email: username }], deleted: false });
    if (user && (await this.hashPassword(password)) === user.password) {
      return user;
    }
    return null;
  }

  async create(data: UserCreateDto): Promise<void> {
    if (data.login) {
      const user = await this.repositoryUsers.findOne({ login: data.login, deleted: false });
      if (user) {
        throw new BadRequestException('User"s name - already in use');
      }
    }
    if (data.email) {
      const user = await this.repositoryUsers.findOne({ email: data.email, deleted: false });
      if (user) {
        throw new BadRequestException('User"s email - already in use');
      }
    }
    data.password = await this.hashPassword(data.password);
    await this.repositoryUsers.nativeInsert({ ...data, deleted: false });
  }
}

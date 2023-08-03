import { Repository, UpdateResult } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from 'src/utils/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private usersRepository: Repository<User>,
  ) {}

  async create(userData: RegisterUserDto): Promise<User> {
    const { username, fullName, password } = userData;

    const newUser = this.usersRepository.create({
      username,
      fullName,
      password,
    });

    return this.usersRepository.save(newUser);
  }

  async getProfile(userId: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'username', 'fullName', 'desc', 'createdAt', 'updatedAt'],
    });

    return user;
  }

  async updateProfile(
    userId: number,
    userData: UpdateUserDto,
  ): Promise<UpdateResult> {
    const user = await this.usersRepository.update(userId, userData);

    return user;
  }
}

import { Repository } from 'typeorm';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

import { UsersService } from '../users/users.service';

import { User } from '../users/entities/user.entity';

import { JwtServiceDecorator } from 'src/services/jwt';

import { LoginResponse } from './auth.interfaces';
import { UserResponse } from '../users/users.interfaces';
import { USER_REPOSITORY } from 'src/utils/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepository: Repository<User>,
    private userService: UsersService,
    private jwt: JwtServiceDecorator,
  ) {}

  async register(userData: RegisterAuthDto): Promise<UserResponse> {
    const userExist = await this.usersRepository.findOne({
      where: {
        username: userData.username,
      },
    });

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userService.create(userData);

    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
    };
  }

  async login(userData: LoginAuthDto): Promise<LoginResponse> {
    const user = await this.usersRepository.findOne({
      where: { username: userData.username },
    });

    if (!user || !(await user.comparePassword(userData.password))) {
      throw new UnauthorizedException('Login failed');
    }

    const accessToken = await this.jwt.generateUserToken(user);

    return { accessToken };
  }
}

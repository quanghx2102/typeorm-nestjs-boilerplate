import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { AuthController } from './auth.controller';

import { DatabaseModule } from 'src/databases/database.module';

import { globalProviders } from 'src/databases/model.providers';
import { JwtServiceDecorator } from 'src/services/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtService,
    JwtServiceDecorator,
    ...globalProviders,
  ],
})
export class AuthModule {}

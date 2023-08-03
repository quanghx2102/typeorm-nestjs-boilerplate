import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/databases/database.module';
import { globalProviders } from 'src/databases/model.providers';
import { JwtServiceDecorator } from 'src/services/jwt';
import { UploadsService } from '../uploads/uploads.service';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [DatabaseModule, UploadsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtService,
    JwtServiceDecorator,
    UploadsService,
    ...globalProviders,
  ],
})
export class UsersModule {}

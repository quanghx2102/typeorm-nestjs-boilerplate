import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class JwtServiceDecorator {
  constructor(private jwtService: JwtService) {}

  generateUserToken(user: User) {
    return this.jwtService.signAsync(
      {
        id: user.id,
        username: user.username,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRED,
      },
    );
  }

  async verifyToken(token: string): Promise<any> {
    const verify = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    return verify;
  }
}

import { Response } from 'express';
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.register(registerAuthDto);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Register successfully', payload: user });
  }

  @Post('/login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res() res: Response,
  ): Promise<any> {
    const { username, password } = loginAuthDto;

    const response = await this.authService.login({ username, password });

    return res.status(HttpStatus.OK).json({
      message: 'Login successfully',
      payload: { accessToken: response.accessToken },
    });
  }
}

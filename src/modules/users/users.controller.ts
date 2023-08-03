import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from '../uploads/uploads.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadService: UploadsService,
  ) {}

  @Get('/profile')
  async getProfile(@Req() req, @Res() res: Response): Promise<Response> {
    const { id } = req.user;

    const user = await this.usersService.getProfile(id);

    return res.json({ message: 'Get profile successfully', payload: user });
  }

  @Put('/update')
  async updateProfile(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const { id } = req.user;

    await this.usersService.updateProfile(id, updateUserDto);

    return res.json({
      message: 'Update profile successfully',
    });
  }

  @Post('/upload-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(
    @Res() res: Response,
    @Req() req,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5,
          message: 'File không được vượt quá 5mb',
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    const { id } = req.user;
    const data = await this.uploadService.singleUpload(file);

    await this.usersService.updateProfile(id, { avatar: data });

    return res.json({
      message: 'Upload successfully',
    });
  }
}

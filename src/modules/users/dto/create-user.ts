import { IsNotEmpty, IsString, IsUrl, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @Length(6, 30, {
    message:
      'Username must be at least 6 characters and less than 30 characters',
  })
  @Matches(/^[^\s]+$/, { message: 'Username must not contain whitespace' })
  username: string;

  @IsString()
  @IsUrl(undefined, { message: 'Avatar must be a URL' })
  avatar?: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password?: string;
}

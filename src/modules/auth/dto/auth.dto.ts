import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { INVALID_EMAIL } from '../../../shared/constants/strings';

export class AuthResponseDTO {
  accessToken: string;
}

export class RegisterUserDTO {

  @IsNotEmpty({message: "Username must be filled!"})
  @IsString({message: "Username must string!"})
  @MinLength(5, {message: "Username must be at least 5 characters long!"})
  @MaxLength(15, {message: "Username cannot be longer than 15 characters long!"})
  username: string;

  @IsNotEmpty({message: "Password must be "})
  @MinLength(7, { message: 'Password must be at least 7 characters long.' })
  @MaxLength(20, { message: 'Password cannot be longer than 20 characters.' })
  @Matches(/^(?=.*\d)/, { message: 'Password must contain at least one number.' })
  password: string;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

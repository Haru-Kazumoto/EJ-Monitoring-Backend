import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { STATUS_LOGIN } from 'src/modules/enums/status-enum/status.login.enum';

export class AuthResponseDTO {
  accessToken: string;
  status: STATUS_LOGIN
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
  @IsNotEmpty({message: "Username is empty!"})
  username: string;

  @IsString()
  @IsNotEmpty({message: "Password is empty!"})
  password: string;
}

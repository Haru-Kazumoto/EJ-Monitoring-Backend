import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { AuthResponseDTO, LoginUserDTO, RegisterUserDTO } from './dto/auth.dto';
import { STATUS_LOGIN } from '../enums/status.login.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Login user account
   *
   * @param {loginUserDTO}
   * @returns {AuthResponseDTO}
   */
  public async login(loginUserDTO: LoginUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findUser({
      username: loginUserDTO.username,
    });

    if (!userData) {
      throw new UnauthorizedException({
        message: `User with username ${loginUserDTO.username} not found, please register first.`,
        status: STATUS_LOGIN.FAILED,
      });
    }

    const isMatch = await AuthHelpers.verify(
      loginUserDTO.password,
      userData.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException({
        message: 'Login failed!',
        status: STATUS_LOGIN.FAILED,
      });
    }

    const payload = {
      id: userData.id,
      username: userData.username,
      password: userData.password,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      status: STATUS_LOGIN.SUCCESS,
      accessToken: accessToken,
    };
  }

  /**
   * Sign up new user
   *
   * @param user
   * @returns
   */
  public async register(user: RegisterUserDTO): Promise<User> {
    return this.userService.createUser(user);
  }
}

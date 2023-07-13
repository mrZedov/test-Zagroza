import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { LoginOptions } from './interfaces/login-options.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {}

  async login(data: LoginOptions) {
    if (!data.user) {
      return {
        access_token: null,
        refresh_token: null,
        error: data.error,
      };
    }
    const payload = { username: data.user.login, sub: data.user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: process.env.ACCESS_TOKEN_EXP,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXP,
      }),
      error: data.error,
    };
  }

  async refresh(refreshToken: string) {
    this.checkToken(refreshToken);

    const tokenData: any = this.jwtService.decode(refreshToken);
    const user = await this.userService.findById(tokenData.sub);

    return this.login({ user: user, error: false });
  }

  checkToken(token: string) {
    try {
      this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

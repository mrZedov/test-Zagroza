import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.USER_SECRET || '',
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.usersService.findById(payload.sub);
    return {
      id: user.id,
      login: user.login,
      email: user.email,
    };
  }
}

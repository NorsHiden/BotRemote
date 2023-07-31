import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../../utils/types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    const JwtCookieExtractor = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: JwtCookieExtractor,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOneBy({ id: payload.sub });

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return user;
  }
}

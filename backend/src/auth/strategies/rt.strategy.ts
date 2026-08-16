import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      passReqToCallback: true,
    });
  }

  validate(
    req: Request,
    payload: { sub: number; email: string; role: string },
  ) {
    const authorization = req.get('authorization');
    if (!authorization) {
      throw new ForbiddenException('Refresh token missing');
    }

    const refreshToken = authorization.replace('Bearer', '').trim();

    return {
      ...payload,
      refreshToken,
    };
  }
}

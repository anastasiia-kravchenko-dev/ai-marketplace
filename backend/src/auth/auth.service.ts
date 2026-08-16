import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async getTokens(userId: number, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshTokenHash(
    userId: number,
    refreshToken: string | null,
  ) {
    if (!refreshToken) {
      await this.usersService.updateUser(userId, {
        hashedRt: null,
      });
      return;
    }

    const hash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateUser(userId, { hashedRt: hash });
  }

  async register(body: RegisterDto) {
    const user = await this.usersService.findByEmail(body.email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await this.usersService.createUser({
      email: body.email,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async login(body: LoginDto) {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: number) {
    await this.updateRefreshTokenHash(userId, null);
    return { message: 'Logged out successfully' };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.getUser(userId);

    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Access denied');
    }

    const rtMatches = await bcrypt.compare(refreshToken, user.hashedRt);

    if (!rtMatches) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }
}

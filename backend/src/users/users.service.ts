import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async getUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async createUser(body: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async updateUser(
    userId: number,
    data: Partial<{ hashedRt: string | null; email: string; password: string }>,
  ) {
    return this.prismaService.user.update({
      where: {
        id: Number(userId),
      },
      data,
    });
  }
}

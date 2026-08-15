import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  getUsers() {
    return this.prismaService.user.findMany();
  }

  getUser(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  createUser(body: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        email: body.email,
      },
    });
  }
}

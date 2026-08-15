import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  getUsers() {
    return [
      { id: '1', name: 'Alex' },
      { id: '2', name: 'John' },
    ];
  }

  getUser(id: string) {
    return { id, name: 'Alex' };
  }

  createUser(body: CreateUserDto) {
    return {
      message: 'User Created',
      user: body,
    };
  }
}

import { Injectable } from '@nestjs/common';

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

  createUser(body: any) {
    return {
      message: 'User Created',
      user: body,
    }
  }
}

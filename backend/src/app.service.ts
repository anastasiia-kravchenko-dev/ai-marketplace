import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: string; service: string; version: string } {
    return {
      status: 'ok',
      service: 'ai-marketplace',
      version: '1.0.0fff',
    };
  }
}

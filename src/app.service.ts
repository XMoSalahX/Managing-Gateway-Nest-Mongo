import { Injectable } from '@nestjs/common';
import { EnumsResponse } from './utils/constants';

@Injectable()
export class AppService {
  serverChecking(): string {
    return EnumsResponse.SERVER_WORKING;
  }
}

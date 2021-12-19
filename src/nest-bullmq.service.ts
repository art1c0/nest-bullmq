// tslint:disable: variable-name
import { Injectable, Inject } from '@nestjs/common';
import { NEST_BULLMQ_OPTIONS} from './constants';
import { NestBullmqOptions } from './interfaces';
import * as Bullmq from 'bullmq';

interface INestBullmqService {
  getBullmq(): any;
  getOptions(): NestBullmqOptions;
  create(kind: string): any;
}

@Injectable()
export class NestBullmqService implements INestBullmqService {
  constructor(
    @Inject(NEST_BULLMQ_OPTIONS) private nestBullmqOptions: NestBullmqOptions,
  ) {}

  getBullmq(): any {
    return Bullmq;
  }

  getOptions(): NestBullmqOptions {
    return this.nestBullmqOptions;
  }

  create(kind: string): any {
    return (...args: any[]) => {
      return new Bullmq[kind](...args, this.nestBullmqOptions);
    };
  }
}

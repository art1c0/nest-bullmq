import {
  NestBullmqOptions,
} from './nest-bullmq-options.interface';

export interface NestBullmqOptionsFactory {
  createNestBullmqOptions():
    | Promise<NestBullmqOptions>
    | NestBullmqOptions;
}

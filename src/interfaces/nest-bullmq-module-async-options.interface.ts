/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/* Interfaces */
import {
  NestBullmqOptions,
} from './nest-bullmq-options.interface';
import {
  NestBullmqOptionsFactory,
} from './nest-bullmq-options-factory.interface';

export interface NestBullmqAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<NestBullmqOptionsFactory>;
  useClass?: Type<NestBullmqOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NestBullmqOptions> | NestBullmqOptions;
}

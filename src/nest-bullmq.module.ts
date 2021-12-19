import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { NestBullmqService } from './nest-bullmq.service';
import {
  NEST_BULLMQ_OPTIONS,
} from './constants';
import {
  NestBullmqOptions,
  NestBullmqAsyncOptions,
  NestBullmqOptionsFactory,
} from './interfaces';
import { createNestBullmqProviders } from './nest-bullmq.providers';

@Global()
@Module({
  providers: [NestBullmqService],
  exports: [NestBullmqService],
})
export class NestBullmqModule {
  /**
   * Registers a configured NestBullmq Module for import into the current module
   */
  public static register(
    options: NestBullmqOptions,
  ): DynamicModule {
    return {
      module: NestBullmqModule,
      providers: createNestBullmqProviders(options),
    };
  }

  /**
   * Registers a configured NestBullmq Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static registerAsync(
    options: NestBullmqAsyncOptions,
  ): DynamicModule {
    return {
      module: NestBullmqModule,
      imports: options.imports || [],
      providers: [
        ...this.createProviders(options),
      ],
    };
  }

  private static createProviders(
    options: NestBullmqAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options: NestBullmqAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_BULLMQ_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
  provide: NEST_BULLMQ_OPTIONS,
      useFactory: async (optionsFactory: NestBullmqOptionsFactory) =>
        await optionsFactory.createNestBullmqOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }

 }

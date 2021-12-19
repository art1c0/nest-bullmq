import { NestBullmqOptions } from './interfaces';

import { NEST_BULLMQ_OPTIONS } from './constants';

export function createNestBullmqProviders(
  options: NestBullmqOptions,
) {
  return [
    {
      provide: NEST_BULLMQ_OPTIONS,
      useValue: options,
    },
  ];
}

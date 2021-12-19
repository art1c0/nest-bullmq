import { Module } from '@nestjs/common';
import { NestBullmqClientController } from './nest-bullmq-client.controller';
import { NestBullmqModule } from '../nest-bullmq.module';

@Module({
  controllers: [NestBullmqClientController],
  imports: [NestBullmqModule.register({})],
})
export class NestBullmqClientModule {}

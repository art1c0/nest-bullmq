/**
 *  NestBullmqClientController is a testing controller that verifies that
 *  NestBullmqModule was generated properly.
 *
 *  You can quickly verify this by running `npm run start:dev`, and then
 *  connecting to `http://localhost:3000` with your browser.  It should return
 *  a custom message like `Hello from NestBullmqModule`.
 *
 *  Once you begin customizing NestBullmqModule, you'll probably want
 *  to delete this controller.
 */
import { Controller, Get } from '@nestjs/common';
import { NestBullmqService } from '../nest-bullmq.service';

@Controller()
export class NestBullmqClientController {
  constructor(private readonly nestBullmqService: NestBullmqService) {}

  @Get()
  index() {
    return this.nestBullmqService.getBullmq();
  }
}

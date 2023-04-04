import { Controller, Get } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { QueryBus } from '@nestjs/cqrs/dist';
import { AppService } from './app.service';
import * as uuid from 'uuid';
import { OrderEvent } from './order/order.events';

@Controller()
export class AppController {
  constructor(
    private readonly eventBus: EventBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async bid(): Promise<object> {
    const orderTransactionGUID = uuid.v4();
    // We are hard-coding values here
    // instead of collecting them from a request
    this.eventBus.publish(
      new OrderEvent(orderTransactionGUID, 'John Doe', 'iPhone', 1000),
    );
    return { status: 'PENDING' };
  }
}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemRepository } from './item/item.repository';
import { OrderHandler } from './order/order.handler';
import { OrderSaga } from './order/order.saga';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [OrderHandler, OrderSaga, ItemRepository],
})
export class AppModule {}

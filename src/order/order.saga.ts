import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { flatMap, map, Observable } from 'rxjs';
import { OrderCommand } from './order.command';
import { OrderEvent, OrderEventFail, OrderEventSuccess } from './order.events';

export class OrderSaga {
  @Saga()
  createOrder = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      //checks the event type for each event
      ofType(OrderEvent),
      map((event: OrderEvent) => {
        return new OrderCommand(
          event.orderTransactionGUID,
          event.orderUser,
          event.orderItem,
          event.orderAmount,
        );
      }),
    );
  };

  @Saga()
  createOrderSuccess = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderEventSuccess),
      flatMap((event: OrderEventSuccess) => {
        console.log('Order Placed');
        return [];
      }),
    );
  };

  @Saga()
  createOrderFail = (event$: Observable<any>): Observable<ICommand> => {
    return event$.pipe(
      ofType(OrderEventFail),
      flatMap((event: OrderEventFail) => {
        console.log('Order Placing Failed');
        return [];
      }),
    );
  };
}

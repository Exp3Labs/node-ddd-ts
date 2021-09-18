import { Connection, Message, Exchange, Queue } from 'amqp-ts';
import { injectable } from 'inversify';
import { DomainEvent } from '@/shared/domain/bus/domain.event';
import DomainEventSubscriber from '@/shared/domain/bus/domain.event.subscriber';
import EventBus from '@/shared/domain/bus/event.bus';

type RabbitMQConfig = {
   user: string;
   password: string;
   host: string;
   queue: string;
   exchange: string;
};

@injectable()
export default class RabbitMQEventBus implements EventBus {

   private connection: Connection;
   private exchange: Exchange;
   private queue: Queue;
   private subscribers: Map<string, Array<DomainEventSubscriber<DomainEvent>>>;

   constructor(config: RabbitMQConfig) {
      this.connection = new Connection(`amqp://${config.user}:${config.password}@${config.host}`);
      this.exchange = this.connection.declareExchange(config.exchange, 'fanout', { durable: false });
      this.queue = this.connection.declareQueue(config.queue);
      this.subscribers = new Map();
   }

   async start(): Promise<void> {

      console.log('started', this.subscribers);

      await this.queue.bind(this.exchange);

      await this.queue.activateConsumer(

         async message => {

            const event = message.content.toString();

            console.log('event here', event);
            /*if (event) {
               const subscribers = this.subscribers.get(event.eventName);
               if (subscribers && subscribers.length) {
                  const subscribersNames = subscribers.map(subscriber => subscriber.constructor.name);
                  this.logger.info(`[RabbitMqEventBus] Message processed: ${event.eventName} by ${subscribersNames}`);
                  const subscribersExecutions = subscribers.map(subscriber => subscriber.on(event));
                  await Promise.all(subscribersExecutions);
               }
            }
            message.ack();*/
         },
         { noAck: false }
      );
   }

   addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
      subscribers.forEach(subscriber => {
         subscriber.subscribedTo().forEach(event => {
            const eventName = event.EVENT_NAME;
            if (this.subscribers.has(eventName)) {
               this.subscribers.get(eventName)!.push(subscriber);
            } else {
               this.subscribers.set(eventName, [subscriber]);
            }
         });
      });
   }

   async publish(events: DomainEvent[]): Promise<void> {
      const executions: any = [];
      events.map(event => {
         const message = new Message({
            data: {
               id: event.eventId,
               type: event.eventName,
               occurred_on: event.occurredOn,
               attributes: event.toPrimitive()
            },
            meta: {}
         });
         console.log(`[RabbitMQEventBus] Event to be published: ${event.eventName}`);
         executions.push(this.exchange.send(message));
      });

      await Promise.all(executions);
   }

}
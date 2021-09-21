import { inject, injectable } from 'inversify';
import { Connection, Message, Exchange, Queue } from 'amqp-ts';

import { DomainEvent } from '@/shared/domain/event-bus/domain.event';
import DomainEventSubscriber from '@/shared/domain/event-bus/domain.event.subscriber';
import EventBus from '@/shared/domain/event-bus/event.bus';
import DomainEventJSONDeserializer from '@/shared/infrastructure/event-bus/rabbitmq/domain.event.json.deserializer';
import DomainEventMapping from '@/shared/infrastructure/event-bus/rabbitmq/domain.event.mapping';
import { TYPES } from '@/shared/infrastructure/di/types';
import Logger from '@/shared/domain/ports/logger';

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
  private deserializer?: DomainEventJSONDeserializer;

  constructor(
    config: RabbitMQConfig,
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
    this.connection = new Connection(
      `amqp://${config.user}:${config.password}@${config.host}`
    );
    this.exchange = this.connection.declareExchange(config.exchange, 'fanout', {
      durable: false
    });
    this.queue = this.connection.declareQueue(config.queue);
    this.subscribers = new Map();
  }

  async start(): Promise<void> {
    if (!this.deserializer) {
      throw new Error(
        `${RabbitMQEventBus.name} has not been properly initialized, deserializer is missing`
      );
    }

    console.log('started', this.subscribers);

    await this.queue.bind(this.exchange);

    await this.queue.activateConsumer(
      async (message) => {

        const event = this.deserializer!.deserialize(
          message.content.toString()
        );

        if (event) {
          const subscribers = this.subscribers.get(event.eventName);
          if (subscribers && subscribers.length) {
            const subscribersNames = subscribers.map(
              (subscriber) => subscriber.constructor.name
            );
            this.logger.info(
              `[RabbitMQEventBus] Message processed: ${event.eventName} by ${subscribersNames}`
            );
            const subscribersExecutions = subscribers.map((subscriber) =>
              subscriber.on(event)
            );
            await Promise.all(subscribersExecutions);
          }
        }
        message.ack();
      },
      { noAck: false }
    );
  }

  addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        const eventName = event.EVENT_NAME;
        if (this.subscribers.has(eventName)) {
          this.subscribers.get(eventName)!.push(subscriber);
        } else {
          this.subscribers.set(eventName, [subscriber]);
        }
      });
    });
    this.setDomainEventMapping(new DomainEventMapping(subscribers));
  }

  private setDomainEventMapping(domainEventMapping: DomainEventMapping): void {
    this.deserializer = new DomainEventJSONDeserializer(domainEventMapping);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    const executions: any = [];
    events.map((event) => {
      const message = new Message({
        data: {
          id: event.eventId,
          type: event.eventName,
          occurred_on: event.occurredOn,
          attributes: event.toPrimitive()
        },
        meta: {}
      });
      this.logger.info(
        `[RabbitMQEventBus] Event to be published: ${event.eventName}`
      );
      executions.push(this.exchange.send(message));
    });

    await Promise.all(executions);
  }
}

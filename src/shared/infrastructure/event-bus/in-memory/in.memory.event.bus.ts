import { injectable } from 'inversify';
import { DomainEvent } from '@/shared/domain/event-bus/domain.event';
import DomainEventSubscriber from '@/shared/domain/event-bus/domain.event.subscriber';
import EventBus from '@/shared/domain/event-bus/event.bus';

@injectable()
export default class InMemoryEventBus implements EventBus {
  private static instance?: InMemoryEventBus = undefined;
  private subscribers: Map<string, Array<DomainEventSubscriber<DomainEvent>>>;

  private constructor() {
    this.subscribers = new Map();
  }

  public static getInstance(): InMemoryEventBus {
    if (this.instance === undefined) {
      this.instance = new InMemoryEventBus();
    }
    return this.instance;
  }

  async start(): Promise<void> {
    console.log('started', this.subscribers);
    await Promise.all([]);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach(async (event) => {
      const subscribers = this.subscribers.get(event.eventName);
      if (subscribers && subscribers.length > 0) {
        const subscribersNames = subscribers.map(
          (subscriber) => subscriber.constructor.name
        );
        console.log(
          `[InMemoryEventBus] Message processed: ${event.eventName} by ${subscribersNames}`
        );
        const subscribersExecutions = subscribers.map((subscriber) =>
          subscriber.on(event)
        );
        await Promise.all(subscribersExecutions);
      }
    });
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {
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
  }
}

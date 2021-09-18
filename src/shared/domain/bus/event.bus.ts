import { DomainEvent } from "./domain.event";
import DomainEventSubscriber from "./domain.event.subscriber";

export default interface EventBus {
   addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
   start(): Promise<void>;
   publish(events: Array<DomainEvent>): Promise<void>;
}
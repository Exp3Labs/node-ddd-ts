import { DomainEvent, DomainEventClass } from './domain.event';

export default interface DomainEventSubscriber<T extends DomainEvent> {
   subscribedTo(): Array<DomainEventClass>;
   on(domainEvent: T): Promise<void>;
}

import AppContainer from '@/shared/infrastructure/d-injection/index';
import EventBus from '@/shared/domain/event-bus/event.bus';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import DomainEventSubscriber from '@/shared/domain/event-bus/domain.event.subscriber';
import { DomainEvent } from '@/shared/domain/event-bus/domain.event';

const initSubscribers = () => {
  const eventBus = AppContainer.get<EventBus>(TYPES.EventBus);
  const subscriberDefinitions = AppContainer.getAll<
    DomainEventSubscriber<DomainEvent>
  >(TYPES.DomainEventSubscriber);
  eventBus.addSubscribers(subscriberDefinitions);
  eventBus.start();
};

export { initSubscribers };

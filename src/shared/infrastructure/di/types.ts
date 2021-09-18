import { TYPES as DOG_TYPES } from '@/dogs/infrastructure/di/types';

const TYPES = {
  ...DOG_TYPES,

  JWT: Symbol.for('JWT'),
  EventBus: Symbol.for('EventBus'),
  DomainEventSubscriber: Symbol.for('DomainEventSubscriber'),
};

export { TYPES };
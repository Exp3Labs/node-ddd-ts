export const TYPES = {
  JWT: Symbol.for('JWT'),

  EventBus: Symbol.for('EventBus'),
  DomainEventSubscriber: Symbol.for('DomainEventSubscriber'),

  CommandBus: Symbol.for('CommandBus'),
  CommandBusHandler: Symbol.for('CommandBusHandler'),

  QueryBus: Symbol.for('QueryBus'),
  QueryBusHandler: Symbol.for('QueryBusHandler'),

  Logger: Symbol.for('Logger')
};

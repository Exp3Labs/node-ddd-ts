import { v4 as uuidv4 } from 'uuid';

export abstract class DomainEvent {
  static EVENT_NAME: string;

  readonly entityId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(
    eventName: string,
    entityId: string,
    eventId?: string,
    occurredOn?: Date
  ) {
    this.entityId = entityId;
    this.eventId = eventId || uuidv4();
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  abstract toPrimitive(): Object;

  static fromPrimitives: (...args: any[]) => any;
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(...args: any[]): DomainEvent;
};

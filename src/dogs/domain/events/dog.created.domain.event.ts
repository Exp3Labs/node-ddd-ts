import { DomainEvent } from '@/shared/domain/event-bus/domain.event';

type CreateDogDomainEventBody = {
  readonly id: string;
  readonly name: string;
  readonly breed: string;
  readonly eventName: string;
};
export class DogCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'dog.created';

  private id: string;
  private name: string;
  private breed: string;

  constructor(
    id: string,
    name: string,
    breed: string,
    occurredOn: Date,
    eventId?: string
  ) {
    super(DogCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.id = id;
    this.name = name;
    this.breed = breed;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getBreed(): string {
    return this.breed;
  }

  toPrimitive(): CreateDogDomainEventBody {
    const { name, breed, entityId } = this;
    return {
      id: entityId,
      name,
      breed,
      eventName: DogCreatedDomainEvent.EVENT_NAME
    };
  }

  static fromPrimitives(
    entityId: string,
    body: CreateDogDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new DogCreatedDomainEvent(
      entityId,
      body.name,
      body.breed,
      occurredOn,
      eventId
    );
  }
}

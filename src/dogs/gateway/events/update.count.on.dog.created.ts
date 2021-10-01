import { injectable } from 'inversify';
import { DomainEventClass } from '@/shared/domain/event-bus/domain.event';
import { DomainEventSubscriber } from '@/shared/domain/event-bus/domain.event.subscriber';
import { DogCreatedDomainEvent } from '@/dogs/domain/dog.created.domain.event';

@injectable()
export class UpdateStatisticsOnDogCreated
  implements DomainEventSubscriber<DogCreatedDomainEvent>
{
  subscribedTo(): DomainEventClass[] {
    return [DogCreatedDomainEvent];
  }

  async on(domainEvent: DogCreatedDomainEvent): Promise<void> {
    console.log(
      `hi there, I'm listening dog created domain event ${domainEvent.getName()}`
    );
  }
}

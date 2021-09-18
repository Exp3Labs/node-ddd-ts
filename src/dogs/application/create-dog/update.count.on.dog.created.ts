import { injectable } from "inversify";
import { DomainEventClass } from "@/shared/domain/bus/domain.event";
import DomainEventSubscriber from "@/shared/domain/bus/domain.event.subscriber";
import DogCreatedDomainEvent from "../../domain/events/dog.created.domain.event";

@injectable()
export default class UpdateStatisticsOnDogCreated implements DomainEventSubscriber<DogCreatedDomainEvent> {

   subscribedTo(): DomainEventClass[] {
      return [DogCreatedDomainEvent];
   }

   async on(domainEvent: DogCreatedDomainEvent): Promise<void> {
      console.log(`hi there, I'm listening dog created domain event`);
   }

}

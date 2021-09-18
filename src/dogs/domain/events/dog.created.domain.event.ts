import { DomainEvent } from "@/shared/domain/bus/domain.event";

export default class DogCreatedDomainEvent extends DomainEvent {

   static readonly EVENT_NAME = 'dog.created';

   private id: string;
   private name: string;
   private race: string;

   constructor(id: string, name: string, race: string, eventId?: string) {
      super(DogCreatedDomainEvent.EVENT_NAME, id, eventId, new Date());

      this.id = id;
      this.name = name;
      this.race = race;
   }

   getId(): string {
      return this.id;
   }

   getName(): string {
      return this.name;
   }

   getRace(): string {
      return this.race;
   }

   toPrimitive(): Object {
      const { name, race, entityId } = this;
      return {
         name,
         race,
         eventName: DogCreatedDomainEvent.EVENT_NAME,
         id: entityId
      };
   }

}
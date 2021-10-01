import { Entity } from '@/shared/domain/entity';

import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogDate } from '@/dogs/domain/dog.date';
import { DogCreatedDomainEvent } from '@/dogs/domain/dog.created.domain.event';

export class Dog extends Entity {
  constructor(
    private id: DogId,
    private name: DogName,
    private breed: DogBreed,
    private date: DogDate
  ) {
    super();
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.date = date;
  }

  static create(id: DogId, name: DogName, breed: DogBreed, date: DogDate): Dog {
    const dog = new Dog(id, name, breed, date);

    dog.record(
      new DogCreatedDomainEvent(
        id.valueOf(),
        name.valueOf(),
        breed.valueOf(),
        new Date()
      )
    );

    return dog;
  }

  static fromPrimitives(
    id: string,
    name: string,
    breed: string,
    date: Date
  ): Dog {
    const dogId = new DogId(id);
    const dogName = new DogName(name);
    const dogRace = new DogBreed(breed);
    const dogDate = new DogDate(date);
    return new Dog(dogId, dogName, dogRace, dogDate);
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }

  getID(): DogId {
    return this.id;
  }

  getName(): DogName {
    return this.name;
  }

  getBreed(): DogBreed {
    return this.breed;
  }

  getDate(): DogDate {
    return this.date;
  }
}

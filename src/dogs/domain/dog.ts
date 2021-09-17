import DogId from '@/dogs/domain/dog.id';
import DogName from '@/dogs/domain/dog.name';
import DogBreed from '@/dogs/domain/dog.breed';
import DogDate from '@/dogs/domain/dog.date';

// Aggregate root / entity
export default class Dog {
  private id: DogId;
  private name: DogName;
  private breed: DogBreed;
  private date: DogDate;

  constructor(id: DogId, name: DogName, breed: DogBreed, date: DogDate) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.date = date;
  }

  static fromPrimitives(
    id: string,
    name: string,
    breed: string,
    date: Date
  ): Dog {
    const dogId = DogId.fromValue(id);
    const dogName = DogName.fromValue(name);
    const dogRace = DogBreed.fromValue(breed);
    const dogDate = DogDate.fromValue(date);
    return new Dog(dogId, dogName, dogRace, dogDate);
  }

  getID(): DogId {
    return this.id;
  }

  getName(): DogName {
    return this.name;
  }

  getRace(): DogBreed {
    return this.breed;
  }

  getDate(): DogDate {
    return this.date;
  }
}

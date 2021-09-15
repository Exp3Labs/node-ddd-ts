import DogDate from './dog.date';
import DogId from './dog.id';
import DogName from './dog.name';
import DogRace from './dog.race';

// Aggregate root / entity
export default class Dog {
  private id: DogId;
  private name: DogName;
  private race: DogRace;
  private date: DogDate;

  constructor(id: DogId, name: DogName, race: DogRace, date: DogDate) {
    this.id = id;
    this.name = name;
    this.race = race;
    this.date = date;
  }

  static fromPrimitives(
    id: string,
    name: string,
    race: string,
    date: Date
  ): Dog {
    const dogId = DogId.fromValue(id);
    const dogName = DogName.fromValue(name);
    const dogRace = DogRace.fromValue(race);
    const dogDate = DogDate.fromValue(date);
    return new Dog(dogId, dogName, dogRace, dogDate);
  }

  getID(): DogId {
    return this.id;
  }

  getName(): DogName {
    return this.name;
  }

  getRace(): DogRace {
    return this.race;
  }

  getDate(): DogDate {
    return this.date;
  }
}

import Dog from '../domain/dog';

// Response
export default class DogResponse {
  private id: string;
  private name: string;
  private race: string;
  private date: Date;

  constructor(id: string, name: string, race: string, date: Date) {
    this.id = id;
    this.name = name;
    this.race = race;
    this.date = date;
  }

  static fromDomain(dog: Dog): DogResponse {
    return new DogResponse(
      dog.getID().getValue(),
      dog.getName().getValue(),
      dog.getRace().getValue(),
      dog.getDate().getValue()
    );
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

  getDate(): Date {
    return this.date;
  }
}

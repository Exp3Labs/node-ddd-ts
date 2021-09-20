import Dog from '@/dogs/domain/dog';

// Response
export default class DogResponse {
  private id: string;
  private name: string;
  private breed: string;
  private date: Date;

  constructor(id: string, name: string, breed: string, date: Date) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.date = date;
  }

  static fromDomain(dog: Dog): DogResponse {
    return new DogResponse(
      dog.getID().getValue(),
      dog.getName().getValue(),
      dog.getBreed().getValue(),
      dog.getDate().getValue()
    );
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

  getDate(): Date {
    return this.date;
  }
}

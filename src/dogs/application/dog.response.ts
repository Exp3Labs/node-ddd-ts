import { Dog } from '@/dogs/domain/dog';
import { Response } from '@/shared/domain/cqrs/query-bus/response';
// Response
export class DogResponse implements Response {
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
      dog.getID().valueOf(),
      dog.getName().valueOf(),
      dog.getBreed().valueOf(),
      dog.getDate().valueOf()
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

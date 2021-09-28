import { Response } from '@/shared/domain/cqrs/query-bus/response';
import { Breed } from '@/breeds/domain/breed';

export class BreedResponse implements Response {
  constructor(
    private readonly name: string,
    private readonly adaptability: string,
    private readonly coatLength: string
  ) {}

  static fromDomain(breed: Breed): BreedResponse {
    return new BreedResponse(
      breed.getName().valueOf(),
      breed.getAdaptabilityLevel().getValue().toString(),
      breed.getCoatLength().getValue().toString()
    );
  }

  getName(): string {
    return this.name;
  }

  getAdaptability(): string {
    return this.adaptability;
  }

  getCoatLength(): string {
    return this.coatLength;
  }
}

import { Entity } from '@/shared/domain/entity';
import {
  BreedAdaptabilityLevel,
  TypesAdaptabilityLevel
} from '@/breeds/domain/breed.adaptability.level';
import { BreedCoatLength } from '@/breeds/domain/breed.coat.length';
import { BreedName } from '@/breeds/domain/breed.name';

export class Breed extends Entity {
  private readonly name: BreedName;
  private readonly adaptabilityLevel: BreedAdaptabilityLevel;
  private readonly coatLength: BreedCoatLength;

  constructor(
    name: BreedName,
    adaptabilityLevel: BreedAdaptabilityLevel,
    coatLength: BreedCoatLength
  ) {
    super();
    this.name = name;
    this.adaptabilityLevel = adaptabilityLevel;
    this.coatLength = coatLength;
  }

  getAdaptabilityLevel(): BreedAdaptabilityLevel {
    return this.adaptabilityLevel;
  }

  getCoatLength(): BreedCoatLength {
    return this.coatLength;
  }

  getName(): BreedName {
    return this.name;
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }

  static fromPrimitives(
    name: string,
    adaptabilityLevel: string,
    coatLength: string
  ) {
    const breedName = BreedName.fromValue(name);
    const breedAdaptabilityLevel =
      BreedAdaptabilityLevel.fromValue(adaptabilityLevel);
    const breedCoatLength = BreedCoatLength.fromValue(coatLength);
    return new Breed(breedName, breedAdaptabilityLevel, breedCoatLength);
  }
}

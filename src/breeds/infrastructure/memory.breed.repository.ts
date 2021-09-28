import { injectable } from 'inversify';
import { Breed } from '@/breeds/domain/breed';
import { BreedName } from '@/breeds/domain/breed.name';
import { BreedRepository } from '@/breeds/domain/breed.repository';

type BreedModel = {
  name: string;
  adaptability: string;
  coatLength: string;
};

@injectable()
export class MemoryBreedRepository implements BreedRepository {
  private breeds: Array<BreedModel>;

  constructor() {
    this.breeds = [
      { name: 'Chihuahua', adaptability: 'Highly', coatLength: 'Medium' },
      { name: 'Dalmatian', adaptability: 'Highly', coatLength: 'Short' },
      { name: 'Rottweiler', adaptability: 'Medium', coatLength: 'Short' }
    ];
  }

  async findBreedByName(breedName: BreedName): Promise<Breed | null> {
    const breedFound = this.breeds.find(
      (breed) => breed.name.toLowerCase() === breedName.valueOf().toLowerCase()
    );

    return breedFound ? this.fromPrimitives(breedFound) : null;
  }

  private fromPrimitives(result: BreedModel): Breed {
    return Breed.fromPrimitives(
      result.name,
      result.adaptability,
      result.coatLength
    );
  }
}

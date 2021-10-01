import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '@/dogs/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { Dog } from '@/dogs/domain/dog';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogDate } from '@/dogs/domain/dog.date';
import { DogNotFound } from '@/dogs/domain/exceptions/dog.not.found';

type Params = {
  dogId: DogId;
  dogName: DogName;
  dogBreed: DogBreed;
};

@provide(TYPES.UpdateDogUseCase)
export class UpdateDogUseCase implements UseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(params: Params) {
    const dogId = params.dogId;
    const dogName = params.dogName;
    const dogBreed = params.dogBreed;

    const dog = new Dog(dogId, dogName, dogBreed, new DogDate(new Date()));

    const result = await this.dogRepository.update(dog);

    if (!result) {
      throw new DogNotFound(dogId.valueOf());
    }
  }
}

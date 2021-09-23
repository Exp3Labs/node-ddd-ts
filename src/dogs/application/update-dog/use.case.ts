import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { Dog } from '@/dogs/domain/dog';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogUpdateCommand } from '@/dogs/application/update-dog/command';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { DogDate } from '@/dogs/domain/dog.date';
import { DogNotFound } from '@/dogs/domain/exceptions/dog.not.found';
import { UseCase } from '@/shared/domain/use.case';

// use case DDD: update dog
type Params = {
  dogId: DogId;
  dogName: DogName;
  dogBreed: DogBreed;
};
@injectable()
export class UpdateDogUseCase implements UseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(params: Params) {
    const dogId = params.dogId;
    const dogName = params.dogName;
    const dogBreed = params.dogBreed;

    const dog = new Dog(
      dogId,
      dogName,
      dogBreed,
      DogDate.fromValue(new Date())
    );

    const result = await this.dogRepository.update(dog);

    if (!result) {
      throw new DogNotFound(dogId.getValue());
    }

    // Domain event
    // this.eventBus.publish(new DogUpdate(dog));
  }
}

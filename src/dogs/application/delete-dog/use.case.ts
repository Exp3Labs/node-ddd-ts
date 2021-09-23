import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { DogId } from '@/dogs/domain/dog.id';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { DogNotFound } from '@/dogs/domain/exceptions/dog.not.found';
import { UseCase } from '@/shared/domain/use.case';

type Params = {
  dogId: DogId;
};
@injectable()
export class DeleteDogUseCase implements UseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(params: Params) {
    const dogId = DogId.fromValue(params.dogId.getValue());

    const result = await this.dogRepository.delete(dogId);

    if (!result) {
      throw new DogNotFound(dogId.getValue());
    }

    // Domain event
    // this.eventBus.publish(new DogUpdate(dog));
  }
}

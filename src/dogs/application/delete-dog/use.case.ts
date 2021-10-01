import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '@/dogs/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { DogId } from '@/dogs/domain/dog.id';
import { DogNotFound } from '@/dogs/domain/exceptions/dog.not.found';

type Params = {
  dogId: DogId;
};

@provide(TYPES.DeleteDogUseCase)
export class DeleteDogUseCase implements UseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(params: Params) {
    const dogId = new DogId(params.dogId.valueOf());

    const result = await this.dogRepository.delete(dogId);

    if (!result) {
      throw new DogNotFound(dogId.valueOf());
    }
  }
}

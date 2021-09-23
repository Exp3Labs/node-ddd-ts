import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { DogId } from '@/dogs/domain/dog.id';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { DogResponse } from '@/dogs/application/dog.response';
import { DogNotFound } from '@/dogs/domain/exceptions/dog.not.found';
import { UseCase } from '@/shared/domain/use.case';

type Params = {
  dogId: DogId;
};
@injectable()
export class FindDogUseCase implements UseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(params: Params): Promise<DogResponse> {
    const dog = await this.dogRepository.findById(params.dogId);
    if (!dog) {
      throw new DogNotFound(params.dogId.getValue());
    }

    return DogResponse.fromDomain(dog);
  }
}

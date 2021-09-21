import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/di/types';
import DogId from '@/dogs/domain/dog.id';
import DogFindQuery from '@/dogs/application/find-dog/query';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import DogResponse from '@/dogs/application/dog.response';
import DogNotFound from '@/dogs/domain/exceptions/dog.not.found';

type Params = {
  dogId: DogId
};

@injectable()
export default class DogFind {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) { }

  async main(params: Params): Promise<DogResponse> {

    const dog = await this.dogRepository.findById(params.dogId);
    if (!dog) {
      throw new DogNotFound(params.dogId.getValue());
    }

    return DogResponse.fromDomain(dog);
  }
}

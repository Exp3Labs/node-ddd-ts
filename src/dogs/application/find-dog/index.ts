import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/di/types';
import DogId from '@/dogs/domain/dog.id';
import DogFindQuery from '@/dogs/application/find-dog/query';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import DogResponse from '../dog.response';
import DogNotFound from '../../domain/exceptions/dog.not.found';

// use case DDD: find dog
@injectable()
export default class DogFind {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) { }

  async main(query: DogFindQuery): Promise<DogResponse> {
    const dogId = DogId.fromValue(query.getId());

    const dog = await this.dogRepository.findById(dogId);
    if (!dog) {
      throw new DogNotFound(dogId.getValue());
    }

    return DogResponse.fromDomain(dog);

    // Domain event
    // this.eventBus.publish(new DogCreated(dog));
  }
}

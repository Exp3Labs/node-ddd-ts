import { inject, injectable } from 'inversify';
import { TYPES } from '@/core/di/types';
import DogId from '@/app/dogs/domain/dog.id';
import DogFindQuey from '@/app/dogs/application/find-dog/query';
import DogRepository from '@/app/dogs/domain/ports/dog.repository';
import DogResponse from '../dog.response';
import DogNotFound from '../../domain/exceptions/dog.not.found';

// use case DDD: dogs/application/createDog
@injectable()
export default class DogFind {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(query: DogFindQuey): Promise<DogResponse> {
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

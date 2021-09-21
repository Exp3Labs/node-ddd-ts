import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import Dog from '@/dogs/domain/dog';
import DogId from '@/dogs/domain/dog.id';
import DogName from '@/dogs/domain/dog.name';
import DogBreed from '@/dogs/domain/dog.breed';
import DogDate from '@/dogs/domain/dog.date';
import DogRepository from '@/dogs/domain/dog.repository';
import EventBus from '@/shared/domain/event-bus/event.bus';
import { UseCase } from '@/shared/domain/use.case';

type Params = {
  dogId: DogId;
  dogName: DogName;
  dogBreed: DogBreed;
  dogDate: DogDate;
};

@injectable()
class CreateDogUseCase implements UseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository,
    @inject(TYPES.EventBus) private readonly eventBus: EventBus
  ) { }

  async main(params: Params) {

    const dog = Dog.create(params.dogId, params.dogName, params.dogBreed, params.dogDate);

    await this.dogRepository.save(dog);

    await this.eventBus.publish(dog.pullDomainEvents());
  }

}

export { CreateDogUseCase };
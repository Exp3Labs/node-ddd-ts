import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/di/types';
import Dog from '@/dogs/domain/dog';
import DogId from '@/dogs/domain/dog.id';
import DogName from '@/dogs/domain/dog.name';
import DogBreed from '@/dogs/domain/dog.breed';
import DogDate from '@/dogs/domain/dog.date';
import DogCreatorCommand from '@/dogs/application/create-dog/command';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import EventBus from '@/shared/domain/event-bus/event.bus';

// use case DDD: create dog
@injectable()
export default class DogCreate {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository,
    @inject(TYPES.EventBus) private readonly eventBus: EventBus
  ) { }

  async main(command: DogCreatorCommand) {
    const dogId = DogId.fromValue(command.getId());
    const dogName = DogName.fromValue(command.getName());
    const dogRace = DogBreed.fromValue(command.getRace());
    const dogDate = DogDate.fromValue(new Date());

    const dog = Dog.create(dogId, dogName, dogRace, dogDate);

    await this.dogRepository.save(dog);

    // Domain event
    await this.eventBus.publish(dog.pullDomainEvents());
  }
}

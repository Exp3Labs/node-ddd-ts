import { inject, injectable } from 'inversify';
import { TYPES } from '@/dogs/infrastructure/di/types';
import Dog from '@/dogs/domain/dog';
import DogId from '@/dogs/domain/dog.id';
import DogName from '@/dogs/domain/dog.name';
import DogBreed from '@/dogs/domain/dog.breed';
import DogDate from '@/dogs/domain/dog.date';
import DogCreatorCommand from '@/dogs/application/create-dog/command';
import DogRepository from '@/dogs/domain/ports/dog.repository';

// use case DDD: create dog
@injectable()
export default class DogCreate {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(command: DogCreatorCommand) {
    const dogId = DogId.fromValue(command.getId());
    const dogName = DogName.fromValue(command.getName());
    const dogRace = DogBreed.fromValue(command.getRace());
    const dogDate = DogDate.fromValue(new Date());

    const dog = new Dog(dogId, dogName, dogRace, dogDate);

    await this.dogRepository.save(dog);

    // Domain event
    // this.eventBus.publish(new DogCreated(dog));
  }
}

import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/di/types';
import Dog from '@/dogs/domain/dog';
import DogId from '@/dogs/domain/dog.id';
import DogName from '@/dogs/domain/dog.name';
import DogBreed from '@/dogs/domain/dog.breed';
import DogUpdateCommand from '@/dogs/application/update-dog/command';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import DogDate from '@/dogs/domain/dog.date';
import DogNotFound from '@/dogs/domain/exceptions/dog.not.found';

// use case DDD: update dog
@injectable()
export default class DogUpdate {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) { }

  async main(command: DogUpdateCommand) {
    const dogId = DogId.fromValue(command.getId());
    const dogName = DogName.fromValue(command.getName());
    const dogRace = DogBreed.fromValue(command.getRace());

    const dog = new Dog(dogId, dogName, dogRace, DogDate.fromValue(new Date()));

    const result = await this.dogRepository.update(dog);

    if (!result) {
      throw new DogNotFound(dogId.getValue());
    }

    // Domain event
    // this.eventBus.publish(new DogUpdate(dog));
  }
}

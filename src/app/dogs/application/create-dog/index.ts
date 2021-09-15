import { inject, injectable } from 'inversify';
import { TYPES } from '@/core/di/types';
import Dog from '@/app/dogs/domain/dog';
import DogId from '@/app/dogs/domain/dog.id';
import DogName from '@/app/dogs/domain/dog.name';
import DogRace from '@/app/dogs/domain/dog.race';
import DogDate from '@/app/dogs/domain/dog.date';
import DogCreatorCommand from '@/app/dogs/application/create-dog/command';
import DogRepository from '@/app/dogs/domain/ports/dog.repository';

// use case DDD: dogs/application/create-dog
@injectable()
export default class DogCreate {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(command: DogCreatorCommand) {
    const dogId = DogId.fromValue(command.getId());
    const dogName = DogName.fromValue(command.getName());
    const dogRace = DogRace.fromValue(command.getRace());
    const dogDate = DogDate.fromValue(new Date());

    const dog = new Dog(dogId, dogName, dogRace, dogDate);

    await this.dogRepository.save(dog);
    // Domain event
    // this.eventBus.publish(new DogCreated(dog));
  }
}

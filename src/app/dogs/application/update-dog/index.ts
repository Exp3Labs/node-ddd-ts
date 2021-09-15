import { inject, injectable } from 'inversify';
import { TYPES } from '@/core/di/types';
import Dog from '@/app/dogs/domain/dog';
import DogId from '@/app/dogs/domain/dog.id';
import DogName from '@/app/dogs/domain/dog.name';
import DogRace from '@/app/dogs/domain/dog.race';
import DogUpdateCommand from '@/app/dogs/application/update-dog/command';
import DogRepository from '@/app/dogs/domain/ports/dog.repository';
import DogDate from '@/app/dogs/domain/dog.date';
import DogNotFound from '@/app/dogs/domain/exceptions/dog.not.found';

// use case DDD: dogs/application/create-dog
@injectable()
export default class DogUpdate {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(command: DogUpdateCommand) {
    const dogId = DogId.fromValue(command.getId());
    const dogName = DogName.fromValue(command.getName());
    const dogRace = DogRace.fromValue(command.getRace());

    const dog = new Dog(dogId, dogName, dogRace, DogDate.fromValue(new Date()));

    const result = await this.dogRepository.update(dog);

    if (!result) {
      throw new DogNotFound(dogId.getValue());
    }

    // Domain event
    // this.eventBus.publish(new DogUpdate(dog));
  }
}

import { inject, injectable } from 'inversify';
import DogCreatorCommand from '@/dogs/application/create-dog/command';
import { CommandHandler } from '@/shared/domain/command-bus/command.handler';
import DogCreateCommand from '@/dogs/application/create-dog/command';
import Command from '@/shared/domain/command-bus/command';
import DogId from '@/dogs/domain/dog.id';
import DogName from '@/dogs/domain/dog.name';
import DogBreed from '@/dogs/domain/dog.breed';
import DogDate from '@/dogs/domain/dog.date';
import { CreateDogUseCase } from '@/dogs/application/create-dog/use.case';
import { TYPES } from '@/shared/infrastructure/d-injection/types';

@injectable()
export default class CreateDogHandler implements CommandHandler<DogCreateCommand> {

  constructor(@inject(TYPES.DogCreate) private readonly dogCreate: CreateDogUseCase) {

  }

  subscribedTo(): Command {
    return DogCreateCommand;
  }

  async handle(command: DogCreatorCommand): Promise<void> {

    const dogId = DogId.fromValue(command.getId());
    const dogName = DogName.fromValue(command.getName());
    const dogBreed = DogBreed.fromValue(command.getBreed());
    const dogDate = DogDate.fromValue(new Date());

    await this.dogCreate.main({ dogId, dogName, dogBreed, dogDate });
  }

}
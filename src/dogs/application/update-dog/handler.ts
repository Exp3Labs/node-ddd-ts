import { inject, injectable } from 'inversify';
import { DogUpdateCommand } from '@/dogs/application/update-dog/command';
import { CommandHandler } from '@/shared/domain/command-bus/command.handler';
import { Command } from '@/shared/domain/command-bus/command';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogDate } from '@/dogs/domain/dog.date';
import { CreateDogUseCase } from '@/dogs/application/create-dog/use.case';
import { TYPES } from '@/shared/infrastructure/d-injection/types';

@injectable()
export class CreateDogHandlerEvent implements CommandHandler<DogUpdateCommand> {
  constructor(
    @inject(TYPES.CreateDogUseCase)
    private readonly createDogUseCase: CreateDogUseCase
  ) {}

  subscribedTo(): Command {
    return DogUpdateCommand;
  }

  async handle(command: DogUpdateCommand): Promise<void> {
    const dogId = DogId.fromValue(command.getId());
    const dogName = DogName.fromValue(command.getName());
    const dogBreed = DogBreed.fromValue(command.getBreed());
    const dogDate = DogDate.fromValue(new Date());

    await this.createDogUseCase.main({ dogId, dogName, dogBreed, dogDate });
  }
}

import { inject, injectable } from 'inversify';
import { DogCreateCommand } from '@/dogs/application/create-dog/command';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogDate } from '@/dogs/domain/dog.date';
import { CreateDogUseCase } from '@/dogs/application/create-dog/use.case';
import { TYPES } from '@/shared/infrastructure/d-injection/types';

@injectable()
export class CreateDogHandler implements CommandHandler<DogCreateCommand> {
  constructor(
    @inject(TYPES.CreateDogUseCase)
    private readonly createDogUseCase: CreateDogUseCase
  ) {}

  subscribedTo = (): Command => DogCreateCommand;

  async handle(command: DogCreateCommand): Promise<void> {
    const dogId = DogId.fromValue(command.getId());
    const dogName = DogName.fromValue(command.getName());
    const dogBreed = DogBreed.fromValue(command.getBreed());
    const dogDate = DogDate.fromValue(new Date());

    await this.createDogUseCase.main({ dogId, dogName, dogBreed, dogDate });
  }
}

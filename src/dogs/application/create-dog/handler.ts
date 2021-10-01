import { inject, injectable } from 'inversify';
import { TYPES } from '@/dogs/infrastructure/d-injection/types';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { DogCreateCommand } from '@/dogs/application/create-dog/command';
import { CreateDogUseCase } from '@/dogs/application/create-dog/use.case';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogDate } from '@/dogs/domain/dog.date';

@injectable()
export class CreateDogHandler implements CommandHandler<DogCreateCommand> {
  constructor(
    @inject(TYPES.CreateDogUseCase)
    private readonly createDogUseCase: CreateDogUseCase
  ) {}

  subscribedTo = (): Command => DogCreateCommand;

  async handle(command: DogCreateCommand): Promise<void> {
    const dogId = new DogId(command.getId());
    const dogName = new DogName(command.getName());
    const dogBreed = new DogBreed(command.getBreed());
    const dogDate = new DogDate(new Date());

    await this.createDogUseCase.main({ dogId, dogName, dogBreed, dogDate });
  }
}

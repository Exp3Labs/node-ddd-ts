import { inject, injectable } from 'inversify';
import { TYPES } from '@/dogs/infrastructure/d-injection/types';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { DogUpdateCommand } from '@/dogs/application/update-dog/command';
import { UpdateDogUseCase } from '@/dogs/application/update-dog/use.case';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogDate } from '@/dogs/domain/dog.date';

@injectable()
export class UpdateDogHandler implements CommandHandler<DogUpdateCommand> {
  constructor(
    @inject(TYPES.UpdateDogUseCase)
    private readonly updateDogUseCase: UpdateDogUseCase
  ) {}

  subscribedTo = (): Command => DogUpdateCommand;

  async handle(command: DogUpdateCommand): Promise<void> {
    const dogId = new DogId(command.getId());
    const dogName = new DogName(command.getName());
    const dogBreed = new DogBreed(command.getBreed());

    await this.updateDogUseCase.main({ dogId, dogName, dogBreed });
  }
}

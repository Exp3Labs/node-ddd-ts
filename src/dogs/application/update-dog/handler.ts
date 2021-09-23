import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { DogUpdateCommand } from '@/dogs/application/update-dog/command';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogDate } from '@/dogs/domain/dog.date';
import { UpdateDogUseCase } from '@/dogs/application/update-dog/use.case';

@injectable()
export class UpdateDogHandler implements CommandHandler<DogUpdateCommand> {
  constructor(
    @inject(TYPES.UpdateDogUseCase)
    private readonly updateDogUseCase: UpdateDogUseCase
  ) {}

  subscribedTo(): Command {
    return DogUpdateCommand;
  }

  async handle(command: DogUpdateCommand): Promise<void> {
    const dogId = DogId.fromValue(command.getId());
    const dogName = DogName.fromValue(command.getName());
    const dogBreed = DogBreed.fromValue(command.getBreed());
    const dogDate = DogDate.fromValue(new Date());

    // await this.updateDogUseCase.main({ dogId, dogName, dogBreed, dogDate });
  }
}

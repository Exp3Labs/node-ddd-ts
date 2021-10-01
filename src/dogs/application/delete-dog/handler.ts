import { inject, injectable } from 'inversify';
import { TYPES } from '@/dogs/infrastructure/d-injection/types';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { DogDeleteCommand } from '@/dogs/application/delete-dog/command';
import { DeleteDogUseCase } from '@/dogs/application/delete-dog/use.case';
import { DogId } from '@/dogs/domain/dog.id';

@injectable()
export class DeleteDogHandler implements CommandHandler<DogDeleteCommand> {
  constructor(
    @inject(TYPES.DeleteDogUseCase)
    private readonly deleteDogUseCase: DeleteDogUseCase
  ) {}

  subscribedTo = (): Command => DogDeleteCommand;

  async handle(command: DogDeleteCommand): Promise<void> {
    const dogId = new DogId(command.getId());
    await this.deleteDogUseCase.main({ dogId });
  }
}

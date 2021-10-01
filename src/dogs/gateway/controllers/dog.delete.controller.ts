import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { DogDeleteCommand } from '@/dogs/application/delete-dog/command';

@injectable()
export class DogDeleteController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus
  ) {}

  async deleteDog({ id }: any) {
    // validations
    const command = new DogDeleteCommand(id);
    return await this.commandBus.dispatch(command);
  }
}

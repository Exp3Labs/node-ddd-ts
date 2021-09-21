import { inject } from 'inversify';
import { DogCreateCommand } from '@/dogs/application/create-dog/command';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/command-bus/command.bus';
class DogPostController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus
  ) {}

  async create({ id, name, breed }: any) {
    // validations
    const command = new DogCreateCommand(id, name, breed);
    return await this.commandBus.dispatch(command);
  }
}

export { DogPostController };

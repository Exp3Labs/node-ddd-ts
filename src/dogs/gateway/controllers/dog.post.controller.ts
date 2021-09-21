import { inject } from 'inversify';
import DogCreatorCommand from '@/dogs/application/create-dog/command';
import { TYPES } from '@/shared/infrastructure/di/types';
import { CommandBus } from '@/shared/domain/command-bus/command.bus';
export default class DogPostController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus
  ) { }

  async create({ id, name, breed }: any) {
    // validations
    const command = new DogCreatorCommand(id, name, breed);
    return await this.commandBus.dispatch(command);
  }
}

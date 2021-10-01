import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { DogCreateCommand } from '@/dogs/application/create-dog/command';
@injectable()
export class DogPostController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus
  ) {}

  async createDog({ id, name, breed }: any) {
    // validations
    const command = new DogCreateCommand(id, name, breed);
    return await this.commandBus.dispatch(command);
  }
}

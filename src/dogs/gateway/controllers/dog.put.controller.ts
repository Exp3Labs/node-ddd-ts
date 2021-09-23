import { inject } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { DogUpdateCommand } from '@/dogs/application/update-dog/command';
export class DogPutController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus
  ) {}

  async updateDog({ id, name, breed }: any) {
    const command = new DogUpdateCommand(id, name, breed);
    return await this.commandBus.dispatch(command);
  }
}

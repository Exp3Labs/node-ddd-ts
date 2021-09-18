import { inject } from 'inversify';
import DogCreate from '@/dogs/application/create-dog';
import DogCreatorCommand from '@/dogs/application/create-dog/command';
import { TYPES } from '@/shared/infrastructure/di/types';

export default class DogPostController {
  constructor(
    @inject(TYPES.DogCreate) private readonly dogCreator: DogCreate
  ) {}

  async create({ id, name, breed }: any) {
    const command = new DogCreatorCommand(id, name, breed);
    return await this.dogCreator.main(command);
  }
}

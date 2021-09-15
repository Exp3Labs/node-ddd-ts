import { inject } from 'inversify';
import DogCreate from '@/app/dogs/application/create-dog';
import DogCreatorCommand from '@/app/dogs/application/create-dog/command';
import { TYPES } from '@/core/di/types';

export default class DogPostController {
  constructor(
    @inject(TYPES.DogCreate) private readonly dogCreator: DogCreate
  ) {}

  async create({ id, name, race }: any) {
    try {
      const command = new DogCreatorCommand(id, name, race);

      return await this.dogCreator.main(command);
    } catch (error) {
      console.log({ error });
    }
  }
}

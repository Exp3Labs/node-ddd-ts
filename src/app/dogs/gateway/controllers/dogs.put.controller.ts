import { inject } from 'inversify';
import DogUpdate from '@/app/dogs/application/update-dog';
import DogUpdateCommand from '@/app/dogs/application/update-dog/command';
import { TYPES } from '@/core/di/types';

export default class DogPutController {
  constructor(
    @inject(TYPES.DogUpdate) private readonly dogUpdate: DogUpdate
  ) {}

  async update({ id, name, race }: any) {
    try {
      const command = new DogUpdateCommand(id, name, race);

      return await this.dogUpdate.main(command);
    } catch (error) {
      console.log({ error });
    }
  }
}

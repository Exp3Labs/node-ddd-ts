import { inject } from 'inversify';
import DogUpdate from '@/dogs/application/update-dog';
import DogUpdateCommand from '@/dogs/application/update-dog/command';
import { TYPES } from '@/shared/infrastructure/di/types';

export default class DogPutController {
  constructor(@inject(TYPES.DogUpdate) private readonly dogUpdate: DogUpdate) { }

  async update({ id, name, breed }: any) {
    const command = new DogUpdateCommand(id, name, breed);
    return await this.dogUpdate.main(command);
  }
}

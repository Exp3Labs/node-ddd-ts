import { inject } from 'inversify';
import DogDelete from '@/dogs/application/delete-dog';
import DogDeleteCommand from '@/dogs/application/delete-dog/command';
import { TYPES } from '@/dogs/infrastructure/di/types';

export default class DogDeleteController {
  constructor(@inject(TYPES.DogDelete) private readonly dogDelete: DogDelete) {}

  async delete({ id }: any) {
    const command = new DogDeleteCommand(id);
    return await this.dogDelete.main(command);
  }
}

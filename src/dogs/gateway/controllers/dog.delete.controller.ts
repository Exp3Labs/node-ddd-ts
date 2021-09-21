import { inject } from 'inversify';
import { DeleteDogUseCase } from '@/dogs/application/delete-dog/use.case';
import DogDeleteCommand from '@/dogs/application/delete-dog/command';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
export default class DogDeleteController {
  constructor(
    @inject(TYPES.DeleteDogUseCase)
    private readonly deleteDogUseCase: DeleteDogUseCase
  ) {}

  async delete({ id }: any) {
    const command = new DogDeleteCommand(id);
    return await this.deleteDogUseCase.main(command);
  }
}

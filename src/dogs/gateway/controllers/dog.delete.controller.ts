import { inject } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { DogDeleteCommand } from '@/dogs/application/delete-dog/command';
import { DeleteDogUseCase } from '@/dogs/application/delete-dog/use.case';
export class DogDeleteController {
  constructor(
    @inject(TYPES.DeleteDogUseCase)
    private readonly deleteDogUseCase: DeleteDogUseCase
  ) {}

  async deleteDog({ id }: any) {
    const command = new DogDeleteCommand(id);
    return await this.deleteDogUseCase.main(command);
  }
}

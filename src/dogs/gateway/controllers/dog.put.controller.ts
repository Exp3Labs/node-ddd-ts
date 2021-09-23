import { inject } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { DogUpdateCommand } from '@/dogs/application/update-dog/command';
import { UpdateDogUseCase } from '@/dogs/application/update-dog/use.case';
export class DogPutController {
  constructor(
    @inject(TYPES.UpdateDogUseCase)
    private readonly dogUpdateUseCase: UpdateDogUseCase
  ) {}

  async updateDog({ id, name, breed }: any) {
    const command = new DogUpdateCommand(id, name, breed);
    return await this.dogUpdateUseCase.main(command);
  }
}

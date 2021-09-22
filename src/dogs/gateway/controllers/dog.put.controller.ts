import { inject } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { DogUpdateCommand } from '@/dogs/application/update-dog/command';
import { DogUpdateUseCase } from '@/dogs/application/update-dog/use.case';
export class DogPutController {
  constructor(
    @inject(TYPES.DogUpdateUseCase)
    private readonly dogUpdateUseCase: DogUpdateUseCase
  ) {}

  async updateDog({ id, name, breed }: any) {
    const command = new DogUpdateCommand(id, name, breed);
    return await this.dogUpdateUseCase.main(command);
  }
}

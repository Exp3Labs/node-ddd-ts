import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '@/dogs/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { DogResponse } from '@/dogs/application/dog.response';

//@injectable()
@provide(TYPES.FindAllDogsUseCase)
export class FindAllDogsUseCase implements UseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(): Promise<DogResponse[]> {
    const dogs = await this.dogRepository.findAll();

    return dogs.map((x) => DogResponse.fromDomain(x));
  }
}

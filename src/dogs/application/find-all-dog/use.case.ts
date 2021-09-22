import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { DogResponse } from '@/dogs/application/dog.response';

// use case DDD: find all dogs
@injectable()
export class DogFindAllUseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(): Promise<DogResponse[]> {
    const dogs = await this.dogRepository.findAll();

    return dogs.map((x) => DogResponse.fromDomain(x));
  }
}

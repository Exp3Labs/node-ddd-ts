import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { BreedName } from '@/breeds/domain/breed.name';
import { BreedRepository } from '@/breeds/domain/breed.repository';
import { BreedResponse } from '../breed.response';
import { DomainError } from '@/shared/domain/domain.error';

type Params = {
  name: BreedName;
};

@injectable()
export class FindBreedUseCase implements UseCase {
  constructor(
    @inject(TYPES.BreedRepository) private readonly breedRepository: BreedRepository
  ) { }

  async main(params: Params): Promise<BreedResponse> {
    const breed = await this.breedRepository.findBreedByName(params.name);
    if (!breed) {
      throw new DomainError(`Breed Not Found`);
    }
    return BreedResponse.fromDomain(breed);
  }
}

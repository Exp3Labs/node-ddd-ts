import { BreedResponse } from '@/breeds/application/breed.response';
import { FindBreedQuery } from '@/breeds/application/find-breed/query';
import { FindBreedUseCase } from '@/breeds/application/find-breed/use.case';
import { BreedName } from '@/breeds/domain/breed.name';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { inject, injectable } from 'inversify';

@injectable()
export class FindBreedHandler
  implements QueryHandler<FindBreedQuery, BreedResponse>
{
  constructor(
    @inject(TYPES.FindBreedUseCase)
    private readonly breedFindUseCase: FindBreedUseCase
  ) {}

  subscribedTo = (): Query => FindBreedQuery;

  handle(query: FindBreedQuery): Promise<BreedResponse> {
    const breedName = BreedName.fromValue(query.getName());
    return this.breedFindUseCase.main({ name: breedName });
  }
}

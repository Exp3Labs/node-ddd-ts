import { inject, injectable } from 'inversify';

import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';

import { TYPES } from '@/dogs/infrastructure/d-injection/types';
import { DogFindAllQuery } from '@/dogs/application/find-all-dog/query';
import { FindAllDogsUseCase } from '@/dogs/application/find-all-dog/use.case';
import { DogResponse } from '@/dogs/application/dog.response';

@injectable()
export class FindAllDogsHandler
  implements QueryHandler<DogFindAllQuery, DogResponse[]>
{
  constructor(
    @inject(TYPES.FindAllDogsUseCase)
    private readonly findAllDogsUseCase: FindAllDogsUseCase
  ) {}

  subscribedTo = (): Query => DogFindAllQuery;

  handle(query: DogFindAllQuery): Promise<DogResponse[]> {
    return this.findAllDogsUseCase.main();
  }
}

import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { DogFindAllUseCase } from '@/dogs/application/find-all-dog/use.case';
import { DogResponse } from '@/dogs/application/dog.response';
import { DogFindAllQuery } from '@/dogs/application/find-all-dog/query';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';

@injectable()
export class DogFindAllHandler
  implements QueryHandler<DogFindAllQuery, DogResponse[]>
{
  constructor(
    @inject(TYPES.DogFindAllUseCase)
    private readonly dogFindAllUseCase: DogFindAllUseCase
  ) {}

  subscribedTo = (): Query => DogFindAllQuery;

  handle(query: DogFindAllQuery): Promise<DogResponse[]> {
    return this.dogFindAllUseCase.main();
  }
}

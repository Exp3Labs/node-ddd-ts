import { inject, injectable } from 'inversify';
import { TYPES } from '@/dogs/infrastructure/d-injection/types';
import { FindDogUseCase } from '@/dogs/application/find-dog/use.case';
import { DogId } from '@/dogs/domain/dog.id';
import { DogResponse } from '@/dogs/application/dog.response';
import { DogFindQuery } from '@/dogs/application/find-dog/query';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';

@injectable()
export class FindDogHandler implements QueryHandler<DogFindQuery, DogResponse> {
  constructor(
    @inject(TYPES.FindDogUseCase)
    private readonly dogFindUseCase: FindDogUseCase
  ) {}

  subscribedTo = (): Query => DogFindQuery;

  handle(query: DogFindQuery): Promise<DogResponse> {
    const dogId = new DogId(query.getId());
    return this.dogFindUseCase.main({ dogId });
  }
}

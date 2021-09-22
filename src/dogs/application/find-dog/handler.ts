import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { DogFindUseCase } from '@/dogs/application/find-dog/use.case';
import { DogId } from '@/dogs/domain/dog.id';
import { DogResponse } from '@/dogs/application/dog.response';
import { DogFindQuery } from '@/dogs/application/find-dog/query';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';

@injectable()
export class DogFindHandler implements QueryHandler<DogFindQuery, DogResponse> {
  constructor(
    @inject(TYPES.DogFindUseCase)
    private readonly dogFindUseCase: DogFindUseCase
  ) {}

  subscribedTo(): Query {
    return DogFindQuery;
  }

  handle(query: DogFindQuery): Promise<DogResponse> {
    const dogId = DogId.fromValue(query.getId());
    return this.dogFindUseCase.main({ dogId });
  }
}

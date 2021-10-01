import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { CatFindAllQuery } from './query';
import { CatResponse } from '@/cats/application/cat.response';
import { Inject, Service } from 'typedi';
import { QueryHandlerToken } from '@/shared/infrastructure/di/tokens';
import { FindAllCatsUseCase } from './use.case';

@Service({ id: QueryHandlerToken })
export class FindAllCatHandler
  implements QueryHandler<CatFindAllQuery, CatResponse[]>
{
  constructor(@Inject() private useCase: FindAllCatsUseCase) {}

  subscribedTo = (): Query => CatFindAllQuery;

  async handle(query: CatFindAllQuery): Promise<CatResponse[]> {
    return this.useCase.main();
  }
}

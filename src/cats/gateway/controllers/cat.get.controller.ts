import { Inject, Service } from 'typedi';

import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';
import { QueryBusToken } from '@/shared/infrastructure/di/tokens';

import { CatFindAllQuery } from '@/cats/application/find-all-cat/query';

@Service()
export class CatGetController {
  constructor(@Inject(QueryBusToken) private queryBus: QueryBus) {}

  async getAllCats() {
    const query = new CatFindAllQuery();
    await this.queryBus.ask(query);
    return [];
  }
}

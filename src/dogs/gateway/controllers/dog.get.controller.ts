import { inject } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';
import { DogFindQuery } from '@/dogs/application/find-dog/query';
import { DogFindAllQuery } from '@/dogs/application/find-all-dog/query';
export class DogGetController {
  constructor(@inject(TYPES.QueryBus) private readonly queryBus: QueryBus) {}

  async getDog({ id }: any) {
    const query = new DogFindQuery(id);
    return await this.queryBus.ask(query);
  }

  async getAllDogs() {
    const query = new DogFindAllQuery();
    return await this.queryBus.ask(query);
  }
}

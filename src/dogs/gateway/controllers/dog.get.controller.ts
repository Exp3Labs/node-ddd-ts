import { inject } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { QueryBus } from '@/shared/domain/query-bus/query.bus';
import { DogFindQuery } from '@/dogs/application/find-dog/query';
export class DogGetController {
  constructor(@inject(TYPES.QueryBus) private readonly queryBus: QueryBus) {}

  async getDog({ id }: any) {
    const query = new DogFindQuery(id);
    return await this.queryBus.ask(query);
  }

  async getAllDogs() {
    return [];
    //return await this.dogFindAll.main();
  }
}

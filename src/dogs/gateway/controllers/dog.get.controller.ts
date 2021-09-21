import { inject } from 'inversify';
import DogFindQuery from '@/dogs/application/find-dog/query';
import { TYPES } from '@/shared/infrastructure/di/types';
import { QueryBus } from '@/shared/domain/query-bus/query.bus';
export default class DogGetController {
  constructor(
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus,
  ) { }

  async get({ id }: any) {
    const query = new DogFindQuery(id);
    return await this.queryBus.ask(query);
  }

  async getAll() {
    return [];
    //return await this.dogFindAll.main();
  }
}

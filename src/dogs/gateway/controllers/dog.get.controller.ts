import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';
import { DogFindQuery } from '@/dogs/application/find-dog/query';
import { DogFindAllQuery } from '@/dogs/application/find-all-dog/query';

@injectable()
export class DogGetController {
  private errors = {
    DogRaceInvalid: { code: 'dog-race-invalid', status: 404 }
  };

  constructor(@inject(TYPES.QueryBus) private readonly queryBus: QueryBus) {}

  async getDog({ id }: any) {
    try {
      const query = new DogFindQuery(id);
      return await this.queryBus.ask(query);
    } catch (error) {
      // ... Dog Not Found     ---> 404
      // ... Dot Breed Invalid ---> 406
    }
  }

  async getAllDogs() {
    const query = new DogFindAllQuery();
    return await this.queryBus.ask(query);
  }
}

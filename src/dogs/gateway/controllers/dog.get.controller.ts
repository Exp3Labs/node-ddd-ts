import { inject } from 'inversify';
import DogFind from '@/dogs/application/find-dog';
import DogFindQuery from '@/dogs/application/find-dog/query';
import DogFindAll from '@/dogs/application/find-all-dog';
import { TYPES } from '@/shared/infrastructure/di/types';

export default class DogGetController {
  constructor(
    @inject(TYPES.DogFind) private readonly dogFind: DogFind,
    @inject(TYPES.DogFindAll) private readonly dogFindAll: DogFindAll
  ) { }

  async get({ id }: any) {
    const query = new DogFindQuery(id);
    return await this.dogFind.main(query);
  }

  async getAll() {
    return await this.dogFindAll.main();
  }
}

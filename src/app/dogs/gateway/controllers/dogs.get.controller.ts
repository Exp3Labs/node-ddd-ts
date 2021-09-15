import { inject } from 'inversify';
import DogFind from '@/app/dogs/application/find-dog';
import DogFindQuery from '@/app/dogs/application/find-dog/query';
import { TYPES } from '@/core/di/types';

export default class DogGetController {
  constructor(@inject(TYPES.DogFind) private readonly dogFind: DogFind) {}

  async get({ id }: any) {
    try {
      const query = new DogFindQuery(id);

      return await this.dogFind.main(query);
    } catch (error) {
      console.log({ error });
    }
  }
}

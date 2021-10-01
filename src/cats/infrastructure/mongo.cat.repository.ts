import { Service } from 'typedi';

import { CatRepositoryToken } from '@/cats/infrastructure/di/tokens';
import { CatRepository } from '@/cats/domain/cat.repository';
import { Cat } from '@/cats/domain/cat';

@Service({ id: CatRepositoryToken, multiple: true })
export class MongoCatRepository implements CatRepository {
  async findAll(): Promise<Cat[]> {
    console.log('mongo');
    return [];
  }
}

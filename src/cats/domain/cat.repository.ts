import { Cat } from '@/cats/domain/cat';

export interface CatRepository {
  findAll(): Promise<Cat[]>;
}

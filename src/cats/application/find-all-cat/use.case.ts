import { CatRepository } from '@/cats/domain/cat.repository';
import { CatRepositoryToken } from '@/cats/infrastructure/di/tokens';
import { UseCase } from '@/shared/domain/use.case';
import { Inject, Service } from 'typedi';
import { CatResponse } from '@/cats/application/cat.response';

@Service()
export class FindAllCatsUseCase implements UseCase {
  constructor(
    @Inject(CatRepositoryToken) private catRepository: CatRepository
  ) {}

  async main(): Promise<CatResponse[]> {
    await this.catRepository.findAll();
    return [];
  }
}

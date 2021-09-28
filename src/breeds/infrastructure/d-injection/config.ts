import { Container } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';

import { BreedRepository } from '@/breeds/domain/breed.repository';
import { MemoryBreedRepository } from '../memory.breed.repository';
import { FindBreedUseCase } from '@/breeds/application/find-breed/use.case';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { Response } from '@/shared/domain/cqrs/query-bus/response';
import { FindBreedHandler } from '@/breeds/application/find-breed/handler';

export class BreedDependencies {

  register(container: Container) {
    // repositories
    container.bind<BreedRepository>(TYPES.BreedRepository).to(MemoryBreedRepository);

    // use cases
    container.bind<FindBreedUseCase>(TYPES.FindBreedUseCase).to(FindBreedUseCase);

    // query-handlers
    container
      .bind<QueryHandler<Query, Response>>(TYPES.QueryBusHandler)
      .to(FindBreedHandler);

  }

}
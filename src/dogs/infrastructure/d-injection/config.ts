import { Container } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';

import { QueryHandler } from '@/shared/domain/query-bus/query.handler';
import { Query } from '@/shared/domain/query-bus/query';
import { Response } from '@/shared/domain/query-bus/response';

import { CommandHandler } from '@/shared/domain/command-bus/command.handler';
import { Command } from '@/shared/domain/command-bus/command';

import { DomainEvent } from '@/shared/domain/event-bus/domain.event';
import { DomainEventSubscriber } from '@/shared/domain/event-bus/domain.event.subscriber';

import { UpdateStatisticsOnDogCreated } from '@/dogs/gateway/events/update.count.on.dog.created';

import { CreateDogHandler } from '@/dogs/application/create-dog/handler';
import { DogFindHandler } from '@/dogs/application/find-dog/handler';

import { CreateDogUseCase } from '@/dogs/application/create-dog/use.case';
import { DogFindUseCase } from '@/dogs/application/find-dog/use.case';
import { DogUpdateUseCase } from '@/dogs/application/update-dog/use.case';
import { DeleteDogUseCase } from '@/dogs/application/delete-dog/use.case';
import { DogFindAllUseCase } from '@/dogs/application/find-all-dog/use.case';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { MongoDogRepository } from '@/dogs/infrastructure/mongo.dog.repository';
// import { PostgresDogRepository } from '@/dogs/infrastructure/postgres.dog.repository';
export class DogDependencies {
  register(container: Container) {
    container
      .bind<CreateDogUseCase>(TYPES.CreateDogUseCase)
      .to(CreateDogUseCase);
    container.bind<DogFindUseCase>(TYPES.DogFindUseCase).to(DogFindUseCase);
    container.bind<DogUpdateUseCase>(DogUpdateUseCase).toSelf();
    container.bind<DeleteDogUseCase>(DeleteDogUseCase).toSelf();
    container.bind<DogFindAllUseCase>(DogFindAllUseCase).toSelf();

    container.bind<DogRepository>(TYPES.DogRepository).to(MongoDogRepository);
    // container.bind<DogRepository>(TYPES.DogRepository).to(PostgresDogRepository);

    // event-subscribers
    container
      .bind<DomainEventSubscriber<DomainEvent>>(TYPES.DomainEventSubscriber)
      .to(UpdateStatisticsOnDogCreated);

    // query-handlers
    container
      .bind<QueryHandler<Query, Response>>(TYPES.QueryBusHandler)
      .to(DogFindHandler);

    // command-handlers
    container
      .bind<CommandHandler<Command>>(TYPES.CommandBusHandler)
      .to(CreateDogHandler);
  }
}

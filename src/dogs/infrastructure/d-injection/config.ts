import { Container } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';

import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { Response } from '@/shared/domain/cqrs/query-bus/response';

import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { Command } from '@/shared/domain/cqrs/command-bus/command';

import { DomainEvent } from '@/shared/domain/event-bus/domain.event';
import { DomainEventSubscriber } from '@/shared/domain/event-bus/domain.event.subscriber';

import { UpdateStatisticsOnDogCreated } from '@/dogs/gateway/events/update.count.on.dog.created';

import { CreateDogUseCase } from '@/dogs/application/create-dog/use.case';
import { FindDogUseCase } from '@/dogs/application/find-dog/use.case';
import { UpdateDogUseCase } from '@/dogs/application/update-dog/use.case';
import { DeleteDogUseCase } from '@/dogs/application/delete-dog/use.case';
import { FindAllDogsUseCase } from '@/dogs/application/find-all-dog/use.case';

import { CreateDogHandler } from '@/dogs/application/create-dog/handler';
import { FindDogHandler } from '@/dogs/application/find-dog/handler';
import { UpdateDogHandler } from '@/dogs/application/update-dog/handler';
import { DeleteDogHandler } from '@/dogs/application/delete-dog/handler';
import { FindAllDogsHandler } from '@/dogs/application/find-all-dog/handler';

import { DogRepository } from '@/dogs/domain/dog.repository';
import { MongoDogRepository } from '@/dogs/infrastructure/mongo.dog.repository';
// import { PostgresDogRepository } from '@/dogs/infrastructure/postgres.dog.repository';
export class DogDependencies {
  register(container: Container) {
    container.bind<DogRepository>(TYPES.DogRepository).to(MongoDogRepository);
    // container.bind<DogRepository>(TYPES.DogRepository).to(PostgresDogRepository);

    container
      .bind<CreateDogUseCase>(TYPES.CreateDogUseCase)
      .to(CreateDogUseCase);
    container.bind<FindDogUseCase>(TYPES.FindDogUseCase).to(FindDogUseCase);
    container
      .bind<UpdateDogUseCase>(TYPES.UpdateDogUseCase)
      .to(UpdateDogUseCase);
    container
      .bind<DeleteDogUseCase>(TYPES.DeleteDogUseCase)
      .to(DeleteDogUseCase);
    container
      .bind<FindAllDogsUseCase>(TYPES.FindAllDogsUseCase)
      .to(FindAllDogsUseCase);

    // event-subscribers
    container
      .bind<DomainEventSubscriber<DomainEvent>>(TYPES.DomainEventSubscriber)
      .to(UpdateStatisticsOnDogCreated);

    // query-handlers
    container
      .bind<QueryHandler<Query, Response>>(TYPES.QueryBusHandler)
      .to(FindDogHandler);
    container
      .bind<QueryHandler<Query, Response>>(TYPES.QueryBusHandler)
      .to(FindAllDogsHandler);

    // command-handlers
    container
      .bind<CommandHandler<Command>>(TYPES.CommandBusHandler)
      .to(CreateDogHandler);
    container
      .bind<CommandHandler<Command>>(TYPES.CommandBusHandler)
      .to(UpdateDogHandler);
    container
      .bind<CommandHandler<Command>>(TYPES.CommandBusHandler)
      .to(DeleteDogHandler);
  }
}

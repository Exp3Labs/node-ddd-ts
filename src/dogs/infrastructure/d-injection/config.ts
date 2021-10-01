import { ContainerModule, interfaces } from 'inversify';
import { TYPES } from '@/dogs/infrastructure/d-injection/types';
import { TYPES as TYPES_SHARED } from '@/shared/infrastructure/d-injection/types';

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
import { AppContainer } from '@/shared/infrastructure/d-injection/container';
// import { PostgresDogRepository } from '@/dogs/infrastructure/postgres.dog.repository';

export const DogContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<DogRepository>(TYPES.DogRepository).to(MongoDogRepository);
    // container.bind<DogRepository>(TYPES.DogRepository).to(PostgresDogRepository);

    // event-subscribers
    bind<DomainEventSubscriber<DomainEvent>>(
      TYPES_SHARED.DomainEventSubscriber
    ).to(UpdateStatisticsOnDogCreated);

    // query-handlers
    bind<QueryHandler<Query, Response>>(TYPES_SHARED.QueryBusHandler).to(
      FindDogHandler
    );
    bind<FindAllDogsHandler>(TYPES_SHARED.QueryBusHandler).to(
      FindAllDogsHandler
    );

    // command-handlers
    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler).to(
      CreateDogHandler
    );
    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler).to(
      UpdateDogHandler
    );
    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler).to(
      DeleteDogHandler
    );
  }
);

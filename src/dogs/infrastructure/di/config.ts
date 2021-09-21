import { Container } from 'inversify';
import DogCreate from '@/dogs/application/create-dog';
import DogFind from '@/dogs/application/find-dog';
import DogUpdate from '@/dogs/application/update-dog';
import DogDelete from '@/dogs/application/delete-dog';
import DogFindAll from '@/dogs/application/find-all-dog';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import MongoDogRepository from '@/dogs/infrastructure/mongo.dog.repository';
import { TYPES } from '@/shared/infrastructure/di/types';
import { QueryHandler } from '@/shared/domain/query-bus/query.handler';
import Query from '@/shared/domain/query-bus/query';
import Response from '@/shared/domain/query-bus/response';
import { DogFindHandler } from '@/dogs/application/find-dog/handler';
import { CommandHandler } from '@/shared/domain/command-bus/command.handler';
import Command from '@/shared/domain/command-bus/command';
import DogCreateHandler from '@/dogs/application/create-dog/handler';
import DomainEventSubscriber from '@/shared/domain/event-bus/domain.event.subscriber';
import { DomainEvent } from '@/shared/domain/event-bus/domain.event';
import UpdateCountOnDogCreated from '@/dogs/gateway/events/update.count.on.dog.created';
// import PostgresDogRepository from '@/dogs/infrastructure/postgres.dog.repository';
export class DogDependencies {
  register(container: Container) {

    container.bind<DogCreate>(TYPES.DogCreate).to(DogCreate);
    container.bind<DogFind>(TYPES.DogFind).to(DogFind);
    container.bind<DogUpdate>(DogUpdate).toSelf();
    container.bind<DogDelete>(DogDelete).toSelf();
    container.bind<DogFindAll>(DogFindAll).toSelf();

    container.bind<DogRepository>(TYPES.DogRepository).to(MongoDogRepository);
    // container.bind<DogRepository>(TYPES.DogRepository).to(PostgresDogRepository);

    // event-subscribers
    container.bind<DomainEventSubscriber<DomainEvent>>(TYPES.DomainEventSubscriber).to(UpdateCountOnDogCreated);

    // query-handlers
    container.bind<QueryHandler<Query, Response>>(TYPES.QueryBusHandler).to(DogFindHandler);

    // command-handlers
    container.bind<CommandHandler<Command>>(TYPES.CommandBusHandler).to(DogCreateHandler);

  }
}

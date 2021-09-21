import { Container, interfaces } from 'inversify';
import JWT from '@/shared/domain/ports/jwt';
import JSONWebToken from '@/shared/infrastructure/jwt/jsonwebtoken.jwt';
import {
  RABBITMQ_HOSTNAME,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD
} from '@/shared/infrastructure/config';
import EventBus from '@/shared/domain/event-bus/event.bus';
import RabbitMQEventBus from '@/shared/infrastructure/event-bus/rabbitmq/rabbitmq.event.bus';

import { TYPES } from '@/shared/infrastructure/di/types';
import Logger from '@/shared/domain/ports/logger';
import PinoLogger from '@/shared/infrastructure/logger/pino.logger';
import { CommandBus } from '@/shared/domain/command-bus/command.bus';
import InMemoryCommandBus from '../command-bus/in-memory/in.memory.command.bus';
import { CommandHandler } from '@/shared/domain/command-bus/command.handler';
import Command from '@/shared/domain/command-bus/command';
import { QueryBus } from '@/shared/domain/query-bus/query.bus';
import { InMemoryQueryBus } from '../query-bus/in-memory/in.memory.query.bus';
import { QueryHandler } from '@/shared/domain/query-bus/query.handler';
import Query from '@/shared/domain/query-bus/query';
import Response from '@/shared/domain/query-bus/response';

//import InMemoryEventBus from '@/shared/infrastructure/event-bus/in-memory/in.memory.event.bus';

export class AppDependencies {

  register(container: Container) {

    this.configLogger(container);

    this.configJWT(container);

    this.configEventBus(container);

    this.configCommandBus(container);

    this.configQueryBus(container);

  }

  private configLogger(container: Container) {
    container.bind<Logger>(TYPES.Logger).to(PinoLogger);
  }

  private configJWT(container: Container) {
    container.bind<JWT>(TYPES.JWT).to(JSONWebToken);
  }

  private configEventBus(container: Container) {
    container
      .bind<EventBus>(TYPES.EventBus)
      .toDynamicValue((context: interfaces.Context) => {
        const logger = container.get<Logger>(TYPES.Logger);

        return new RabbitMQEventBus(
          {
            host: RABBITMQ_HOSTNAME,
            user: RABBITMQ_USERNAME,
            password: RABBITMQ_PASSWORD,
            queue: 'dogs.queue',
            exchange: 'dogs.exchange'
          },
          logger
        );
      });
    //container
    //  .bind<EventBus>(TYPES.EventBus).toConstantValue(InMemoryEventBus.getInstance());|
  }

  private configCommandBus(container: Container) {
    // command-bus
    container
      .bind<CommandBus>(TYPES.CommandBus)
      .toDynamicValue((context: interfaces.Context) => {
        const handlersDefinitions = container.getAll<CommandHandler<Command>>(TYPES.CommandBusHandler);
        return new InMemoryCommandBus(handlersDefinitions);
      });
  }

  private configQueryBus(container: Container) {
    container
      .bind<QueryBus>(TYPES.QueryBus)
      .toDynamicValue((context: interfaces.Context) => {
        const handlersDefinitions = container.getAll<QueryHandler<Query, Response>>(TYPES.QueryBusHandler);
        return new InMemoryQueryBus(handlersDefinitions);
      });
  }

}

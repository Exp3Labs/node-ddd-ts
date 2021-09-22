import { Container, interfaces } from 'inversify';
import { JWT } from '@/shared/domain/jwt/jwt';
import { JSONWebToken } from '@/shared/infrastructure/jwt/jsonwebtoken.jwt';
import {
  EVENT_BUS_RABBITMQ,
  JWT as JWT_CONFIG
} from '@/shared/infrastructure/config';
import { EventBus } from '@/shared/domain/event-bus/event.bus';
import { RabbitMQEventBus } from '@/shared/infrastructure/event-bus/rabbitmq/rabbitmq.event.bus';

import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { Logger } from '@/shared/domain/logger';

import { CommandBus } from '@/shared/domain/command-bus/command.bus';
import { InMemoryCommandBus } from '../command-bus/in-memory/in.memory.command.bus';
import { CommandHandler } from '@/shared/domain/command-bus/command.handler';
import { Command } from '@/shared/domain/command-bus/command';
import { QueryBus } from '@/shared/domain/query-bus/query.bus';
import { InMemoryQueryBus } from '../query-bus/in-memory/in.memory.query.bus';
import { QueryHandler } from '@/shared/domain/query-bus/query.handler';
import { Query } from '@/shared/domain/query-bus/query';
import { Response } from '@/shared/domain/query-bus/response';
import { WinstonLogger } from '../logger/winston.logger';

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
    container.bind<Logger>(TYPES.Logger).to(WinstonLogger);
  }

  private configJWT(container: Container) {
    container.bind<JWT>(TYPES.JWT).to(JSONWebToken);

    container
      .bind<JWT>(TYPES.JWT)
      .toDynamicValue((context: interfaces.Context) => {
        return new JSONWebToken(JWT_CONFIG.secretKey);
      });
  }

  private configEventBus(container: Container) {
    container
      .bind<EventBus>(TYPES.EventBus)
      .toDynamicValue((context: interfaces.Context) => {
        return new RabbitMQEventBus(
          {
            host: EVENT_BUS_RABBITMQ.hostname,
            port: EVENT_BUS_RABBITMQ.port,
            user: EVENT_BUS_RABBITMQ.username,
            password: EVENT_BUS_RABBITMQ.password,
            queue: EVENT_BUS_RABBITMQ.queue,
            exchange: EVENT_BUS_RABBITMQ.exchange,
            retries: EVENT_BUS_RABBITMQ.retries,
            interval: EVENT_BUS_RABBITMQ.interval
          },
          context.container.get<Logger>(TYPES.Logger)
        );
      });
    /*container
      .bind<EventBus>(TYPES.EventBus)
      .toConstantValue(InMemoryEventBus.getInstance(container.get<Logger>(TYPES.Logger)));*/
  }

  private configCommandBus(container: Container) {
    // command-bus
    container
      .bind<CommandBus>(TYPES.CommandBus)
      .toDynamicValue((context: interfaces.Context) => {
        const handlersDefinitions = container.getAll<CommandHandler<Command>>(
          TYPES.CommandBusHandler
        );
        return new InMemoryCommandBus(handlersDefinitions);
      });
  }

  private configQueryBus(container: Container) {
    container
      .bind<QueryBus>(TYPES.QueryBus)
      .toDynamicValue((context: interfaces.Context) => {
        const handlersDefinitions = container.getAll<
          QueryHandler<Query, Response>
        >(TYPES.QueryBusHandler);
        return new InMemoryQueryBus(handlersDefinitions);
      });
  }
}

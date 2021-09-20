import { Container, interfaces } from 'inversify';
import JWT from '@/shared/domain/ports/jwt';
import JSONWebToken from '@/shared/infrastructure/jwt/jsonwebtoken.jwt';
import {
  RABBITMQ_HOSTNAME,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD
} from '@/shared/infrastructure/config';
import EventBus from '@/shared/domain/bus/event.bus';
import RabbitMQEventBus from '@/shared/infrastructure/event-bus/rabbitmq/rabbitmq.event.bus';
import LocalEventBus from '@/shared/infrastructure/event-bus/local/local.event.bus';
import DomainEventSubscriber from '@/shared/domain/bus/domain.event.subscriber';
import { DomainEvent } from '@/shared/domain/bus/domain.event';
import UpdateCountOnDogCreated from '@/dogs/gateway/events/update.count.on.dog.created';
import { TYPES } from '@/shared/infrastructure/di/types';
import Logger from '@/shared/domain/ports/logger';
import PinoLogger from '@/shared/infrastructure/logger/pino.logger';

export class AppDependencies {
  register(container: Container) {
    // logger
    container.bind<Logger>(TYPES.Logger).to(PinoLogger);

    // jwt
    container.bind<JWT>(TYPES.JWT).to(JSONWebToken);

    // event-bus
    container
      .bind<DomainEventSubscriber<DomainEvent>>(TYPES.DomainEventSubscriber)
      .to(UpdateCountOnDogCreated);
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
    //  .bind<EventBus>(TYPES.EventBus)
    //  .toConstantValue(LocalEventBus.getInstance());
  }
}

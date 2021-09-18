import { Container, interfaces } from 'inversify';
import JWT from '@/shared/domain/ports/jwt';
import JSONWebToken from '@/shared/infrastructure/jwt/jsonwebtoken';
import EventBus from '@/shared/domain/bus/event.bus';
import RabbitMQEventBus from '@/shared/infrastructure/bus/rabbitmq.event.bus';
import LocalEventBus from '@/shared/infrastructure/bus/local.event.bus';
import DomainEventSubscriber from '@/shared/domain/bus/domain.event.subscriber';
import { DomainEvent } from '@/shared/domain/bus/domain.event';
import UpdateCountOnDogCreated from '@/dogs/application/create-dog/update.count.on.dog.created';
import { TYPES } from './types';

export class AppDependencies {

   register(container: Container) {

      container.bind<JWT>(TYPES.JWT).to(JSONWebToken);
      container.bind<DomainEventSubscriber<DomainEvent>>(TYPES.DomainEventSubscriber).to(UpdateCountOnDogCreated);
      container.bind<EventBus>(TYPES.EventBus).toDynamicValue((context: interfaces.Context) => {
         return new RabbitMQEventBus({
            user: 'guest',
            password: 'guest',
            host: 'localhost',
            queue: 'dogs.queue',
            exchange: 'dogs.exchange',
         });
      });
      //container.bind<EventBus>(TYPES.EventBus).toConstantValue(LocalEventBus.getInstance());
   }

}
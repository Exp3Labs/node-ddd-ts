import { StartModule } from '@/index';

import { EventBus } from '@/shared/domain/event-bus/event.bus';
import { DomainEventSubscriber } from '@/shared/domain/event-bus/domain.event.subscriber';
import { DomainEvent } from '@/shared/domain/event-bus/domain.event';

import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { AppContainer } from '@/shared/infrastructure/d-injection/container';
import { AppDependencies } from '@/shared/infrastructure/d-injection/config';
import { mongooseConnection } from '@/shared/infrastructure/database/mongoose.database';
import { startKoa } from '@/shared/infrastructure/framework/koa.framework';

export class SharedBootstrap implements StartModule {
  async init(): Promise<void> {
    try {
      // database connection
      await mongooseConnection();

      // koa server
      await startKoa();

      // independency injection
      new AppDependencies().register(AppContainer);

      // event bus
      await this.startEventBus();
    } catch (error: any) {
      console.log(
        `[${SharedBootstrap.name}] error starting module --> ${error}`
      );
    }
  }

  private async startEventBus(): Promise<void> {
    const eventBus = AppContainer.get<EventBus>(TYPES.EventBus);
    const subscriberDefinitions = AppContainer.getAll<
      DomainEventSubscriber<DomainEvent>
    >(TYPES.DomainEventSubscriber);
    eventBus.addSubscribers(subscriberDefinitions);
    eventBus.start();
  }
}

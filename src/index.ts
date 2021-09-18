import 'reflect-metadata';
import AppContainer from '@/shared/infrastructure/di';
import '@/shared/infrastructure/libs/koa.lib';
import mongoose from '@/shared/infrastructure/libs/mongoose.lib';
import { Table } from 'console-table-printer';

import EventBus from '@/shared/domain/bus/event.bus';
import DomainEventSubscriber from '@/shared/domain/bus/domain.event.subscriber';
import { DomainEvent } from '@/shared/domain/bus/domain.event';
import { TYPES } from './shared/infrastructure/di/types';

const p = new Table();

const db = async () => {
  try {
    const uri = await mongoose();

    p.addRow({ name: 'MongoDB', status: 'OK', path: uri }, { color: 'green' });
  } catch (error) {
    p.addRow({ name: 'MongoDB', status: 'FAILED', error }, { color: 'red' });
  }
};

(async () => {
  await db();



  const eventBus = AppContainer.get<EventBus>(TYPES.EventBus);
  const subscriberDefinitions = AppContainer.getAll<DomainEventSubscriber<DomainEvent>>(TYPES.DomainEventSubscriber);
  eventBus.addSubscribers(subscriberDefinitions);
  await eventBus.start();

  p.addRow(
    { name: 'Server', status: 'OK', url: 'http://localhost:3000' },
    { color: 'green' }
  );

  p.addRow(
    {
      name: 'Swagger',
      status: 'OK',
      url: 'http://localhost:3000/swagger-html'
    },
    { color: 'green' }
  );

  p.printTable();

})();
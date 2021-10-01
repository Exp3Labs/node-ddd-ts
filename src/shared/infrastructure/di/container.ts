import { Container } from 'typedi';

import { InMemoryQueryBus } from '@/shared/infrastructure/cqrs/in-memory/in.memory.query.bus';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import {
  QueryBusToken,
  QueryHandlerToken
} from '@/shared/infrastructure/di/tokens';

import { FindAllCatHandler } from '@/cats/application/find-all-cat/handler';

Container.import([FindAllCatHandler]);

// Query Bus
const queryHandlersDefinitions =
  Container.getMany<QueryHandler<Query, Response>>(QueryHandlerToken);
Container.set(QueryBusToken, new InMemoryQueryBus(queryHandlersDefinitions));

// Command Bus

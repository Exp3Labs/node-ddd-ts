import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { Response } from '@/shared/domain/cqrs/query-bus/response';

export interface QueryBus {
  ask<R extends Response>(query: Query): Promise<R>;
}

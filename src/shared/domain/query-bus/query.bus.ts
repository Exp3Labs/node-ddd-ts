import { Query } from '@/shared/domain/query-bus/query';
import { Response } from '@/shared/domain/query-bus/response';
export interface QueryBus {
  ask<R extends Response>(query: Query): Promise<R>;
}

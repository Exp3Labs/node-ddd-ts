import { Query } from '@/shared/domain/query-bus/query';
import { Response } from '@/shared/domain/query-bus/response';
export interface QueryHandler<Q extends Query, R extends Response> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}

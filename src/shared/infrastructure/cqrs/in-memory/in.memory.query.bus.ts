import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { QueryNotRegistered } from '@/shared/domain/cqrs/query-bus/query.not.registered';
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { Response } from '@/shared/domain/cqrs/query-bus/response';

export class InMemoryQueryBus implements QueryBus {
  private queryHandlersMap: Map<Query, QueryHandler<Query, Response>>;

  constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers);
  }

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler: any = this.search(query);
    return handler.handle(query) as Promise<R>;
  }

  private formatHandlers(
    queryHandlers: Array<QueryHandler<Query, Response>>
  ): Map<Query, QueryHandler<Query, Response>> {
    const handlersMap = new Map();

    queryHandlers.forEach((queryHandler) => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });

    return handlersMap;
  }

  private search(query: Query): QueryHandler<Query, Response> {
    const queryHandler = this.queryHandlersMap.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegistered(query);
    }

    return queryHandler;
  }
}

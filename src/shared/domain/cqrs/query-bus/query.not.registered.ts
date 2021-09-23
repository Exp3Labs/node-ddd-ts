import { Query } from '@/shared/domain/cqrs/query-bus/query';

export class QueryNotRegistered extends Error {
  constructor(query: Query) {
    super(
      `The query <${query.constructor.name}> hasn't a query handler associated`
    );
  }
}

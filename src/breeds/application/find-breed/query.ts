import { Query } from '@/shared/domain/cqrs/query-bus/query';

export class FindBreedQuery implements Query {
  constructor(private readonly name: string) {}

  getName(): string {
    return this.name;
  }
}

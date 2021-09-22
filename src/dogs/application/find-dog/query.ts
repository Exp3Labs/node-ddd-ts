import { Query } from '@/shared/domain/query-bus/query';
export class DogFindQuery implements Query {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

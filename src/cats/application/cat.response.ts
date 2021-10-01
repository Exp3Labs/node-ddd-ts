import { Response } from '@/shared/domain/cqrs/query-bus/response';

export class CatResponse implements Response {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

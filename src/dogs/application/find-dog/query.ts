import Query from "@/shared/domain/query-bus/query";

export default class DogFindQuery implements Query {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

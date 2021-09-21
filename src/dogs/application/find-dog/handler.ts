import DogId from "@/dogs/domain/dog.id";
import Query from "@/shared/domain/query-bus/query";
import { QueryHandler } from "@/shared/domain/query-bus/query.handler";
import { TYPES } from "@/shared/infrastructure/d-injection/types";
import { inject, injectable } from "inversify";
import DogFind from ".";
import DogResponse from "../dog.response";
import DogFindQuery from "./query";

@injectable()
export class DogFindHandler implements QueryHandler<DogFindQuery, DogResponse> {

  constructor(@inject(TYPES.DogFind) private readonly dogFind: DogFind) { }

  subscribedTo(): Query {
    return DogFindQuery;
  }

  handle(query: DogFindQuery): Promise<DogResponse> {
    const dogId = DogId.fromValue(query.getId());
    return this.dogFind.main({ dogId });
  }

}

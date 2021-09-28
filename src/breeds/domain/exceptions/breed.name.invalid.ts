import { DomainError } from "@/shared/domain/domain.error";

export class BreedNameInvalid extends DomainError {

  constructor(name: string) {
    super(`Breed name ${name} is invalid`);
  }

}
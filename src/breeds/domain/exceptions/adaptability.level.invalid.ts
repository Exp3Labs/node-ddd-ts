import { DomainError } from "@/shared/domain/domain.error";

export class AdaptabilityLevelInvalid extends DomainError {

  constructor(level: string) {
    super(`Adaptability level ${level} is invalid`);
  }

}
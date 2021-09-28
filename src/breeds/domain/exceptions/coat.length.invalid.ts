import { DomainError } from '@/shared/domain/domain.error';

export class CoatLengthInvalid extends DomainError {
  constructor(coatLength: string) {
    super(`Coat length ${coatLength} is invalid`);
  }
}

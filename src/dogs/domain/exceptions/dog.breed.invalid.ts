import { DomainError } from '@/shared/domain/domain.error';
export class DogRaceInvalid extends DomainError {
  constructor(breed: string) {
    super(`The breed ${breed} is invalid`);
  }
}

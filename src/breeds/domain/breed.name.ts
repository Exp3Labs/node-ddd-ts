import { BreedNameInvalid } from '@/breeds/domain/exceptions/breed.name.invalid';
import { VOString } from '@/shared/domain/value-objects/string';

export class BreedName extends VOString({ field: 'Breed name' }) {
  constructor(value: string) {
    super(value);
    BreedName.ensureNameIsValid(value);
  }

  private static ensureNameIsValid(value: string) {
    if (!value) {
      throw new BreedNameInvalid(value);
    }
  }

  static fromValue(value: string): BreedName {
    this.ensureNameIsValid(value);
    return new BreedName(value);
  }
}

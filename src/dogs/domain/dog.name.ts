import { StringValueObject } from '@/shared/domain/value-objects/string.value.object';
// value object
export class DogName extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  private static ensureNameIsValid(value: string) {
    if (!value) {
      throw new Error('Dog name is required');
    }
  }

  static fromValue(value: string): DogName {
    this.ensureNameIsValid(value);
    return new DogName(value);
  }
}

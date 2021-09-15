import ValueObjectString from '@/app/shared/domain/value.object.string';

// value object
export default class DogName extends ValueObjectString {
  private constructor(value: string) {
    super(value);
  }

  private static ensureNameIsValid(value: string) {
    if (!value) {
      throw new Error('Dog name is required');
    }
  }

  static fromValue(value: string): ValueObjectString {
    this.ensureNameIsValid(value);
    return new DogName(value);
  }
}

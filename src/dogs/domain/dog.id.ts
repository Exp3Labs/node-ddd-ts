import ValueObjectString from '@/shared/domain/value.object.string';

// value object
export default class DogId extends ValueObjectString {
  private constructor(value: string) {
    super(value);
  }

  private static ensureIdIsValid(value: string) {
    if (!value) {
      throw new Error('Dog id is required');
    }
  }

  static fromValue(value: string): ValueObjectString {
    this.ensureIdIsValid(value);
    return new DogId(value);
  }
}

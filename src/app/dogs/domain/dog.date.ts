import ValueObjectDate from '@/app/shared/domain/value.object.date';

// value object
export default class DogDate extends ValueObjectDate {
  private constructor(value: Date) {
    super(value);
  }

  private static ensureDateIsValid(value: Date) {
    if (!value) {
      throw new Error('Dog date is required');
    }
  }

  static fromValue(value: Date): ValueObjectDate {
    this.ensureDateIsValid(value);
    return new DogDate(value);
  }
}

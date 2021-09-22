import { DateValueObject } from '@/shared/domain/value-objects/date.value.object';
export class DogDate extends DateValueObject {
  private constructor(value: Date) {
    super(value);
  }

  private static ensureDateIsValid(value: Date) {
    if (!value) {
      throw new Error('Dog date is required');
    }
  }

  static fromValue(value: Date): DogDate {
    this.ensureDateIsValid(value);
    return new DogDate(value);
  }
}

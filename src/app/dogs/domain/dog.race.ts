import ValueObjectString from '@/app/shared/domain/value.object.string';
import DogRaceInvalid from '@/app/dogs/domain/exceptions/dog.race.invalid';

// value object
export default class DogRace extends ValueObjectString {
  private constructor(value: string) {
    super(value);
  }

  public static ensureRaceIsValid(value: string): void {
    if (!value) {
      throw new Error('Dog race is required');
    }

    const arr: any = ['pitbull'];

    if (value.includes(arr)) {
      throw new DogRaceInvalid(value);
    }
  }
  static fromValue(value: string): ValueObjectString {
    this.ensureRaceIsValid(value);
    return new DogRace(value);
  }
}

import ValueObjectString from '@/shared/domain/value.object.string';
import DogRaceInvalid from '@/dogs/domain/exceptions/dog.breed.invalid';

// value object
export default class DogBreed extends ValueObjectString {
  private constructor(value: string) {
    super(value);
  }

  public static ensureRaceIsValid(value: string): void {
    if (!value) {
      throw new Error('Dog breed is required');
    }

    const arr: any = ['pitbull'];

    if (value.includes(arr)) {
      throw new DogRaceInvalid(value);
    }
  }
  static fromValue(value: string): ValueObjectString {
    this.ensureRaceIsValid(value);
    return new DogBreed(value);
  }
}

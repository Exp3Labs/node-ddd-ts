import { StringValueObject } from '@/shared/domain/value-objects/string.value.object';
import { DogRaceInvalid } from '@/dogs/domain/exceptions/dog.breed.invalid';
export class DogBreed extends StringValueObject {
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

  static fromValue(value: string): DogBreed {
    this.ensureRaceIsValid(value);
    return new DogBreed(value);
  }
}

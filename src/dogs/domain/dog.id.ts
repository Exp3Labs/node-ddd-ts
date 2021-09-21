import UUIDValueObject from '@/shared/domain/value-objects/uuid.value.object';

// value object
export default class DogId extends UUIDValueObject {

  private constructor(value: string) {
    super(value);
  }

  private static ensureIdIsValid(value: string) {
    if (!value) {
      throw new Error('Dog id is required');
    }
  }

  static fromValue(value: string): DogId {
    this.ensureIdIsValid(value);
    return new DogId(value);
  }

}

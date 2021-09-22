import { v4 as uuidv4, validate } from 'uuid';
import { UUIDInvalid } from './uuid.invalid';

export class UUIDValueObject {
  private value: string;

  constructor(value: string) {
    this.ensureUUID(value);
    this.value = value;
  }

  private ensureUUID(uuid: string): void {
    if (!validate(uuid)) {
      throw new UUIDInvalid(uuid);
    }
  }

  static random(): UUIDValueObject {
    return new UUIDValueObject(uuidv4());
  }

  getValue(): string {
    return this.value;
  }
}

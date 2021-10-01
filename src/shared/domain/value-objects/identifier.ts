import { v4 as uuidv4, validate } from 'uuid';

import { UUIDInvalid } from '@/shared/domain/value-objects/uuid.invalid';
import { ValueObject } from '@/shared/domain/value-objects/value.object';

export class Identifier implements ValueObject<string> {
  constructor(private value: string) {
    this.ensureUUID(value);
    this.value = value;
  }

  private ensureUUID(uuid: string): void {
    if (!validate(uuid)) {
      throw new UUIDInvalid(uuid);
    }
  }

  static random(): Identifier {
    return new Identifier(uuidv4());
  }

  valueOf(): string {
    return this.value;
  }

  fromPrimitive(value: string): ValueObject<string> {
    return new Identifier(value);
  }

  validate(value: string): void {}

  equals(object: ValueObject<string>): boolean {
    throw new Error('Method not implemented.');
  }
}

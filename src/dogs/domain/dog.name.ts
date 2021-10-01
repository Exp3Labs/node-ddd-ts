import { ValueObject } from '@/shared/domain/value-objects/value.object';

export class DogName implements ValueObject<string> {
  constructor(private value: string) {}

  fromPrimitive(value: string): ValueObject<string> {
    return new DogName(value);
  }

  validate(value: string): void {}

  valueOf(): string {
    return this.value;
  }

  equals(object: ValueObject<string>): boolean {
    throw new Error('Method not implemented.');
  }
}

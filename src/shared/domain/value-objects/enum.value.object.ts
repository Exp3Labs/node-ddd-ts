export abstract class EnumValueObject<T> {
  readonly value: T;

  constructor(value: T, public readonly validValues: T[]) {
    this.checkValueIsValid(value);
    this.value = value;
  }

  checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  getValue(): T {
    return this.value;
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}

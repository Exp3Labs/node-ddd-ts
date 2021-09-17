// value object
export default class ValueObjectDate {
  private value: Date;

  constructor(value: Date) {
    this.value = value;
  }

  getValue(): Date {
    return this.value;
  }
}

export default class DateValueObject {
  private value: Date;

  constructor(value: Date) {
    this.value = value;
  }

  getValue(): Date {
    return this.value;
  }

}

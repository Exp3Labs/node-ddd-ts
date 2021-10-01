import { DomainError } from '@/shared/domain/domain.error';
import { ValueObject } from '@/shared/domain/value-objects/value.object';
import { MomentDate } from '@/shared/infrastructure/date/date';

export class DogDate implements ValueObject<Date> {
  private momentDate: MomentDate;

  constructor(private value: Date) {
    this.momentDate = new MomentDate();
  }

  validate(value: Date): void {
    if (this.momentDate.isValid(value)) {
      throw new DomainError(`Dog date is invalid.`);
    }
  }

  fromPrimitive(value: Date): ValueObject<Date> {
    return new DogDate(value);
  }

  valueOf(): Date {
    return this.value;
  }

  equals(object: ValueObject<Date>): boolean {
    throw new Error('Method not implemented.');
  }
}

import { DomainError } from "@/shared/domain/domain.error";
import { VODefinitionError } from "@/shared/domain/value-objects/definition.error";

export interface VODateOptions {
  /**
   * VO Name
   * @default `value`
   */
  name?: string;

  /**
   * Date format
   * @default `YYYY-MM-DD h:mm:ss`
   */
  format?: string;
}

export interface VODateInstance {
  valueOf(): Date;
}

export interface VODateConstructor {
  new(r: string | Date): VODateInstance;
}

const isDefined = (value: any): boolean => {
  return value !== null && value !== undefined;
};

export const VODate = (options: VODateOptions = {}): VODateConstructor => {

  if (isDefined(options.name)) {
    if (typeof options.name !== 'string') {
      throw new VODefinitionError('name property must be a string.');
    }
  }

  if (isDefined(options.format)) {
    if (typeof options.format !== 'string') {
      throw new VODefinitionError('format property must be a string.');
    }
  }

  // TODO: check if format is valid

  const name = options.name ?? 'Value';
  const format = isDefined(options.format) ? options.format : 'YYYY-MM-DD h:mm:ss';

  return class {

    protected _value: Date;

    constructor(raw: string | Date) {

      if ((typeof raw !== 'string') && !(raw instanceof Date)) {
        throw new DomainError(`${name} is not a date.`);
      }

      if (typeof raw === 'string') {
        if (isNaN(Date.parse(raw))) {
          throw new DomainError(`${name} is not a valid date format.`);
        }

        // TODO: Check if date matches format

        this._value = new Date(raw);
      } else {

        // TODO: Check if date matches format

        this._value = raw;
      }

    }

    valueOf(): Date {
      return new Date();
    }

  }
}
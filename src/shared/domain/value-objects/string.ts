import { DomainError } from '@/shared/domain/domain.error';
import { VODefinitionError } from '@/shared/domain/value-objects/definition.error';

export interface VOStringOptions {
  /**
   * VO Name
   * @default `value`
   */
  field?: string;

  /**
   * Whether it should trim the raw string.
   * @default false
   */
  trim?: boolean;

  /**
   * Minimum inclusive acceptable length after trimming.
   * Can't be less than zero or bigger than `maxLength`.
   */
  minLength?: number;

  /**
   * Regular expression pattern for the raw string after trimming.
   */
  pattern?: RegExp;
}

export interface VOStringInstance {
  valueOf(): string;
}

export interface VOStringConstructor {
  new (r: string): VOStringInstance;
}

const isDefined = (value: any): boolean => {
  return value !== null && value !== undefined;
};

export const VOString = (
  options: VOStringOptions = {}
): VOStringConstructor => {
  if (isDefined(options.field)) {
    if (typeof options.field !== 'string') {
      throw new VODefinitionError('name property must be a string.');
    }
  }

  if (isDefined(options.trim)) {
    if (typeof options.trim !== 'boolean') {
      throw new VODefinitionError('trim property must be a boolean.');
    }
  }

  if (isDefined(options.minLength)) {
    if (typeof options.minLength !== 'number') {
      throw new VODefinitionError('minLength property must be a number.');
    }
    if (!Number.isInteger(options.minLength)) {
      throw new VODefinitionError('minLength property must be an integer.');
    }
    if (options.minLength < 0) {
      throw new VODefinitionError('minLength property must be greater than 0.');
    }
  }

  if (isDefined(options.pattern)) {
    if (!(options.pattern instanceof RegExp)) {
      throw new VODefinitionError(
        'patter property must be a regular expression'
      );
    }
  }

  const trim = options.trim ?? false;
  const field = options.field ?? 'Value';

  return class {
    protected _value: string;

    constructor(raw: string) {
      if (typeof raw !== 'string') {
        throw new DomainError(`${field} is invalid.`);
      }

      if (trim) {
        raw = raw.trim();
      }

      if (isDefined(options.minLength) && raw.length < options.minLength!) {
        throw new DomainError(`${field} is too short.`);
      }

      if (isDefined(options.pattern) && !options.pattern!.test(raw)) {
        throw new DomainError(
          `${field} does not match the regular expression.`
        );
      }

      this._value = raw;
    }

    valueOf(): string {
      return this._value;
    }
  };
};

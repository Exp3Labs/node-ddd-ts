import { validate } from 'uuid';

import { DomainError } from '@/shared/domain/domain.error';
import { VODefinitionError } from '@/shared/domain/value-objects/definition.error';
import { UUIDInvalid } from '@/shared/domain/value-objects/uuid.invalid';

export interface VOIdentifierOptions {
  /**
   * VO Name
   * @default `value`
   */
  name?: string;
}

export interface VOIdentifierInstance {
  valueOf(): string;
}

export interface VOIdentifierConstructor {
  new (r: string): VOIdentifierInstance;
}

const isDefined = (value: any): boolean => {
  return value !== null && value !== undefined;
};

export const VOIdentifier = (
  options: VOIdentifierOptions = {}
): VOIdentifierConstructor => {
  if (isDefined(options.name)) {
    if (typeof options.name !== 'string') {
      throw new VODefinitionError('name property must be a string.');
    }
  }

  const name = options.name ?? 'Value';

  return class {
    protected _value: string;

    constructor(raw: string) {
      if (typeof raw !== 'string') {
        throw new DomainError(`${name} is invalid.`);
      }

      if (!validate(raw)) {
        throw new UUIDInvalid(raw);
      }

      this._value = raw;
    }

    valueOf(): string {
      return this._value;
    }
  };
};

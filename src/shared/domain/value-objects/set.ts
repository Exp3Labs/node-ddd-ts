import { DomainError } from '@/shared/domain/domain.error';
import { VODefinitionError } from '@/shared/domain/value-objects/definition.error';

export interface VOSetOptions<Strict extends boolean = boolean> {
  /**
   * VO Name
   * @default `value`
   */
  field?: string;
  /**
   * Whether it should expect the set elements literal types or their closest
   * super sets (eg. `true => boolean` and `"abc" => string`) for instantiation.
   * Defaults to false.
   */
  strict?: Strict;
}

export type Setable = string | number | boolean;

export type VOSetRaw<
  Element extends Setable,
  Strict extends boolean
> = Strict extends true
  ? Element
  :
      | (Element extends number ? number : never)
      | (Element extends string ? string : never)
      | (Element extends boolean ? boolean : never);

export interface VOSetInstance<Element extends Setable> {
  valueOf(): Element;
}

export interface VOSetConstructor<
  Element extends Setable,
  Strict extends boolean
> {
  new (r: VOSetRaw<Element, Strict>): VOSetInstance<Element>;
}

const isSetable = (element: any): element is Setable =>
  ['number', 'string', 'boolean'].includes(typeof element);

const expectedSetableTypes = (
  set: Array<Setable>
): Array<'number' | 'string' | 'boolean'> =>
  Array.from(
    new Set(set.map((v) => <'number' | 'string' | 'boolean'>typeof v))
  );

export const VOSet = <Element extends Setable, Strict extends boolean>(
  elements: Array<Element>,
  options: VOSetOptions<Strict> = {}
): VOSetConstructor<Element, Strict> => {
  for (const [i, v] of Object.entries(elements)) {
    if (!isSetable(v)) {
      throw new VODefinitionError(`Entries are invalid.`);
    }
  }

  const set = new Set(elements);

  const isInSet = (v: any): v is Element => set.has(v);

  const field = options.field ?? 'Value';
  const strict = options.strict ?? false;
  const nonStrictExpectedTypes = expectedSetableTypes(elements);

  return class {
    protected _value: Element;

    constructor(raw: VOSetRaw<Element, Strict>) {
      if (!strict && !nonStrictExpectedTypes.includes(typeof raw as any)) {
        throw new DomainError(`${field} is invalid.`);
      }
      if (!isInSet(raw)) {
        throw new DomainError(`Value to ${field} is not valid.`);
      }
      this._value = raw;
    }

    valueOf(): Element {
      return this._value;
    }
  };
};

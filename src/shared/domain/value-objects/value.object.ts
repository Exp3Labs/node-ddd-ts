export interface ValueObject<T> {
  valueOf(): T;
  fromPrimitive(value: T): ValueObject<T>;
  validate(value: T): void;
  equals(object: ValueObject<T>): boolean;
}

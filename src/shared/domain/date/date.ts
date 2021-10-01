export interface IDate {
  current(): Date;
  isValid(value: Date): boolean;
}

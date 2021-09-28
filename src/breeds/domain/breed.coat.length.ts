import { EnumValueObject } from "@/shared/domain/value-objects/enum.value.object";
import { CoatLengthInvalid } from "@/breeds/domain/exceptions/coat.length.invalid";

export enum TypesCoatLength {
  Short,
  Medium,
  Long
}

export class BreedCoatLength extends EnumValueObject<TypesCoatLength> {

  constructor(value: TypesCoatLength) {
    super(value, [TypesCoatLength.Long, TypesCoatLength.Medium, TypesCoatLength.Short]);
  }

  static fromValue(value: string): BreedCoatLength {
    switch (value) {
      case "Short":
        return new BreedCoatLength(TypesCoatLength.Short);
      case "Medium":
        return new BreedCoatLength(TypesCoatLength.Medium);
      default:
      case "Long":
        return new BreedCoatLength(TypesCoatLength.Long);
    }
  }

  protected throwErrorForInvalidValue(value: TypesCoatLength): void {
    throw new CoatLengthInvalid(value.toString());
  }

}
import { EnumValueObject } from "@/shared/domain/value-objects/enum.value.object";
import { AdaptabilityLevelInvalid } from "@/breeds/domain/exceptions/adaptability.level.invalid";
import { VOSet } from "@/shared/domain/value-objects/set";

export enum TypesAdaptabilityLevel {
  Highly,
  Medium,
  Lowly
}

export class BreedAdaptabilityLevel extends EnumValueObject<TypesAdaptabilityLevel> {

  constructor(value: TypesAdaptabilityLevel) {
    super(value, [TypesAdaptabilityLevel.Highly, TypesAdaptabilityLevel.Lowly, TypesAdaptabilityLevel.Medium]);
  }

  static fromValue(value: string): BreedAdaptabilityLevel {
    switch (value) {
      case "Highly":
        return new BreedAdaptabilityLevel(TypesAdaptabilityLevel.Highly);
      case "Medium":
        return new BreedAdaptabilityLevel(TypesAdaptabilityLevel.Medium);
      default:
      case "Lowly":
        return new BreedAdaptabilityLevel(TypesAdaptabilityLevel.Lowly);
    }
  }

  protected throwErrorForInvalidValue(value: TypesAdaptabilityLevel): void {
    throw new AdaptabilityLevelInvalid(value.toString());
  }

}

export class BreedAdaptabilityLevels extends VOSet(
  [TypesAdaptabilityLevel.Highly, TypesAdaptabilityLevel.Lowly, TypesAdaptabilityLevel.Medium], {field: ''}) {

}
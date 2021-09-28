import { VOString } from "@/shared/domain/value-objects/string";

export class DogName extends VOString({ field: 'Dog Name', minLength: 1 }) { }

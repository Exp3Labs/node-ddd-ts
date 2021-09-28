import { VOString } from '@/shared/domain/value-objects/string';
// import ...

export class DogBreed extends VOString({ field: 'Dog breed', minLength: 1 }) {}

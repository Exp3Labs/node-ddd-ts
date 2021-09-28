import { VOString } from '@/shared/domain/value-objects/string';

export class DogBreed extends VOString({ field: 'Dog breed', minLength: 1 }) { }

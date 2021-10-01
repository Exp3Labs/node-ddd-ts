import { VOString } from '@/shared/domain/value-objects/string';

export class CatName extends VOString({ field: 'Cat Name', minLength: 1 }) {}

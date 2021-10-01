import { Entity } from '@/shared/domain/entity';
import { CatId } from '@/cats/domain/cat.id';
import { CatName } from '@/cats/domain/cat.name';

export class Cat extends Entity {
  constructor(private id: CatId, private name: CatName) {
    super();
  }

  static fromPrimitives(id: string, name: string): Cat {
    return new Cat(new CatId(id), new CatName(name));
  }

  getId(): CatId {
    return this.id;
  }

  getName(): CatName {
    return this.name;
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}

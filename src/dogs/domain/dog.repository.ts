import { Dog } from '@/dogs/domain/dog';
import { DogId } from '@/dogs/domain/dog.id';
// Ports (actions to do)
export interface DogRepository {
  save(dog: Dog): Promise<void>;
  update(dog: Dog): Promise<boolean>;
  delete(dog: DogId): Promise<boolean>;
  findById(id: DogId): Promise<Dog | null>;
  findAll(): Promise<Dog[]>;
}

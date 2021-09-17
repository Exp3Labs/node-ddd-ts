import Dog from '../dog';
import DogId from '../dog.id';

// Ports (actions to do)
export default interface DogRepository {
  save(dog: Dog): Promise<void>;
  update(dog: Dog): Promise<boolean>;
  delete(dog: DogId): Promise<boolean>;
  findById(id: DogId): Promise<Dog | null>;
  findAll(): Promise<Dog[]>;
}

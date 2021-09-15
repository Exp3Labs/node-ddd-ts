import { injectable } from 'inversify';
import DogRepository from '../domain/ports/dog.repository';
import Dog from '../domain/dog';
import dogId from '../domain/dog.id';

@injectable()
export default class PostgresDogRepository implements DogRepository {
  save(dog: Dog): Promise<void> {
    console.log('create dog with postgres', dog);
    throw new Error('Method not implemented.');
  }
  update(dog: Dog): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(dog: Dog): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: dogId): Promise<Dog | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Dog[]> {
    throw new Error('Method not implemented.');
  }
}

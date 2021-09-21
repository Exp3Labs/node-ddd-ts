import { injectable } from 'inversify';
import DogRepository from '@/dogs/domain/dog.repository';
import Dog from '@/dogs/domain/dog';
import dogId from '@/dogs/domain/dog.id';

// ports/repositories
@injectable()
export default class PostgresDogRepository implements DogRepository {
  save(dog: Dog): Promise<void> {
    console.log('create dog with postgres', dog);
    throw new Error('Method not implemented.');
  }
  update(dog: Dog): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(id: dogId): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findById(id: dogId): Promise<Dog | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Dog[]> {
    throw new Error('Method not implemented.');
  }
}

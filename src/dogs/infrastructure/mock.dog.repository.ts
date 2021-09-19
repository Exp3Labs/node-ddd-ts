import { injectable } from 'inversify';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import Dog from '@/dogs/domain/dog';
import dogId from '@/dogs/domain/dog.id';

// ports/repositories
@injectable()
export default class MockDogRepository implements DogRepository {
  constructor(private readonly dogs: Dog[]) {}

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
  async findById(id: dogId): Promise<Dog | null> {
    const result: any = this.dogs.find(
      (dog: Dog) => dog.getID().getValue() === id.getValue()
    );
    return result;
  }
  findAll(): Promise<Dog[]> {
    throw new Error('Method not implemented.');
  }
}

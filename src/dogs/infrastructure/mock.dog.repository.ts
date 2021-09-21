import { injectable } from 'inversify';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import Dog from '@/dogs/domain/dog';
import dogId from '@/dogs/domain/dog.id';

// ports/repositories
@injectable()
export default class MockDogRepository implements DogRepository {
  constructor(private dogs: Dog[]) {}

  async save(dog: Dog): Promise<void> {
    this.dogs.push(dog);
  }
  async update(dog: Dog): Promise<boolean> {
    const result = this.dogs.map((d: Dog) =>
      d.getID().getValue() === dog.getID().getValue() ? { ...d, ...dog } : d
    );
    return true;
    // return result.find((dog: Dog) => dog.getID().getValue() === id.getValue())
    //   ? true
    //   : false;
  }
  async delete(id: dogId): Promise<boolean> {
    const result = this.dogs.filter(
      (dog: Dog) => dog.getID().getValue() !== id.getValue()
    );
    return result.find((dog: Dog) => dog.getID().getValue() === id.getValue())
      ? false
      : true;
  }
  async findById(id: dogId): Promise<Dog | null> {
    const result: any = this.dogs.find(
      (dog: Dog) => dog.getID().getValue() === id.getValue()
    );
    return result;
  }
  async findAll(): Promise<Dog[]> {
    return this.dogs;
  }
}

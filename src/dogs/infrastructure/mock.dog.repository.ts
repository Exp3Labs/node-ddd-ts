import { injectable } from 'inversify';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { Dog } from '@/dogs/domain/dog';
import { DogId } from '@/dogs/domain/dog.id';

@injectable()
export class MockDogRepository implements DogRepository {
  constructor(private dogs: Dog[]) {}

  async save(dog: Dog): Promise<void> {
    this.dogs.push(dog);
  }
  async update(dog: Dog): Promise<boolean> {
    const result = this.dogs.map((d: Dog) =>
      d.getID().getValue() === dog.getID().getValue() ? dog : d
    );
    this.dogs = result;
    return true;
  }
  async delete(id: DogId): Promise<boolean> {
    const index: number = this.dogs.findIndex(
      (dog: Dog) => dog.getID().getValue() === id.getValue()
    );
    await this.dogs.splice(index, 1);
    return this.dogs.find(
      (dog: Dog) => dog.getID().getValue() === id.getValue()
    )
      ? false
      : true;
  }
  async findById(id: DogId): Promise<Dog | null> {
    const result: any = this.dogs.find(
      (dog: Dog) => dog.getID().getValue() === id.getValue()
    );
    return result;
  }
  async findAll(): Promise<Dog[]> {
    return this.dogs;
  }
}

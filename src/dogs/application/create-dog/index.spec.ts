import DogCreate from '@/dogs/application/create-dog';
import Dog from '@/dogs/domain/dog';
import MockDogRepository from '@/dogs/infrastructure/mock.dog.repository';
import DogCreatorCommand from '@/dogs/application/create-dog/command';

let dogs: any = [];

describe('create-dog', () => {
  it('should create a dog', async () => {
    const dog = {
      id: '2806698',
      name: 'Max',
      breed: 'Dalmatian'
    };
    const mockDogRepository = new MockDogRepository(dogs);
    const dogCreate = new DogCreate(mockDogRepository, null);
    await dogCreate.main(new DogCreatorCommand(dog.id, dog.name, dog.breed));

    const result = dogs.find((d: Dog) => d.getID().getValue() === dog.id);

    expect(result).toBeDefined();
    expect(result?.getName().getValue()).toEqual('Max');
    expect(result?.getBreed().getValue()).toEqual('Dalmatian');
  });
});

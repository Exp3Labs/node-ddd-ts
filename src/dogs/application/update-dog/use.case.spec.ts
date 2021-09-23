import { MockDogRepository } from '@/dogs/infrastructure/mock.dog.repository';
import { Dog } from '@/dogs/domain/dog';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { UpdateDogUseCase } from '@/dogs/application/update-dog/use.case';

const dogs = [
  Dog.fromPrimitives(
    '47876959-4972-4c61-baff-0b46cb4cca48',
    'Perry',
    'Pug',
    new Date()
  ),
  Dog.fromPrimitives(
    '5f2c584b-7e63-4b9a-9253-cacd5957e31a',
    'Mara',
    'Bossie',
    new Date()
  )
];

describe('update-dog', () => {
  it('should update a dog by id', async () => {
    const dog = {
      id: '5f2c584b-7e63-4b9a-9253-cacd5957e31a',
      name: 'Max',
      breed: 'Dalmatian'
    };

    const mockDogRepository = new MockDogRepository(dogs);
    const updateDogUseCase = new UpdateDogUseCase(mockDogRepository);
    await updateDogUseCase.main({
      dogId: DogId.fromValue(dog.id),
      dogName: DogName.fromValue(dog.name),
      dogBreed: DogBreed.fromValue(dog.breed)
    });

    const result = dogs.find((d: Dog) => d.getID().getValue() === dog.id);

    expect(result).toBeDefined();
    expect('Max').toEqual(dog.name);
    expect('Dalmatian').toEqual(dog.breed);
  });
});
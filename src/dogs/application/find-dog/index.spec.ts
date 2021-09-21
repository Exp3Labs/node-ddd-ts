import DogFind from '@/dogs/application/find-dog';
import Dog from '@/dogs/domain/dog';
import MockDogRepository from '@/dogs/infrastructure/mock.dog.repository';
import DogResponse from '@/dogs/application/dog.response';
import DogQuery from '@/dogs/application/find-dog/query';
import DogId from '@/dogs/domain/dog.id';

const dogs = [
  Dog.fromPrimitives('1', 'Perry', 'Pug', new Date()),
  Dog.fromPrimitives('2', 'Mara', 'Bossie', new Date()),
  Dog.fromPrimitives('3', 'Chester', 'Bulldog', new Date()),
  Dog.fromPrimitives('4', 'Tony', 'Poodle', new Date())
];

describe('FindDog', () => {
  it('should find a dog by id', async () => {
    const dogId = '4';

    const mockDogRepository = new MockDogRepository(dogs);
    const dogFind = new DogFind(mockDogRepository);
    const result = await dogFind.main({
      dogId: DogId.fromValue(dogId)
    });

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(DogResponse);
    expect(result.getId()).toEqual(dogId);
  });
});

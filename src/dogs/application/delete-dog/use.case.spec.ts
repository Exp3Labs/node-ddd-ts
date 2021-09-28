import { MockDogRepository } from '@/dogs/infrastructure/mock.dog.repository';
import { DeleteDogUseCase } from '@/dogs/application/delete-dog/use.case';
import { Dog } from '@/dogs/domain/dog';
import { DogId } from '@/dogs/domain/dog.id';

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

describe('delete-dog', () => {
  it('should delete a dog', async () => {
    const dogId = '5f2c584b-7e63-4b9a-9253-cacd5957e31a';

    const mockDogRepository = new MockDogRepository(dogs);

    const deleteDogUseCase = new DeleteDogUseCase(mockDogRepository);

    await deleteDogUseCase.main({
      dogId: new DogId(dogId)
    });

    const result = dogs.find((d: Dog) => d.getID().valueOf() === dogId);

    expect(result).toBeUndefined();
  });
});

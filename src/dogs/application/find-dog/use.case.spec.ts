import { FindDogUseCase } from '@/dogs/application/find-dog/use.case';
import { MockDogRepository } from '@/dogs/infrastructure/mock.dog.repository';
import { Dog } from '@/dogs/domain/dog';
import { DogId } from '@/dogs/domain/dog.id';
import { DogResponse } from '@/dogs/application/dog.response';

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
  ),
  Dog.fromPrimitives(
    'df2f7bcc-4f03-46b7-8b8e-45957d3fa98d',
    'Chester',
    'Bulldog',
    new Date()
  )
];

describe('find-dog', () => {
  it('should find a dog by id', async () => {
    const dogId = '5f2c584b-7e63-4b9a-9253-cacd5957e31a';

    const mockDogRepository = new MockDogRepository(dogs);
    const dogFind = new FindDogUseCase(mockDogRepository);
    const result = await dogFind.main({
      dogId: new DogId(dogId)
    });

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(DogResponse);
    expect(result.getId()).toEqual(dogId);
  });
});

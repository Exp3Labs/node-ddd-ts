import { MockDogRepository } from '@/dogs/infrastructure/mock.dog.repository';
import { FindAllDogsUseCase } from '@/dogs/application/find-all-dog/use.case';
import { Dog } from '@/dogs/domain/dog';
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

describe('find-all-dogs', () => {
  it('should find dogs', async () => {
    const mockDogRepository = new MockDogRepository(dogs);
    const findAllDogsUseCase = new FindAllDogsUseCase(mockDogRepository);
    const result = await findAllDogsUseCase.main();

    expect(result).toBeDefined();
    expect(result[0]).toBeInstanceOf(DogResponse);
  });
});

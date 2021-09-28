import { CreateDogUseCase } from '@/dogs/application/create-dog/use.case';
import { Dog } from '@/dogs/domain/dog';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogDate } from '@/dogs/domain/dog.date';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { MockDogRepository } from '@/dogs/infrastructure/mock.dog.repository';
import { EventBus } from '@/shared/domain/event-bus/event.bus';
import { mock } from 'jest-mock-extended';

let dogs: any = [];

describe('create-dog', () => {
  it('should create a dog', async () => {
    const dog = {
      id: '06a84abb-4249-4fcc-bde5-1423f8394161',
      name: 'Max',
      breed: 'Dalmatian'
    };

    const mockDogRepository = new MockDogRepository(dogs);

    const dogCreate = new CreateDogUseCase(mockDogRepository, mock<EventBus>());

    await dogCreate.main({
      dogId: new DogId(dog.id),
      dogName: new DogName(dog.name),
      dogBreed: new DogBreed(dog.breed),
      dogDate: new DogDate(new Date())
    });

    const result: Dog = dogs.find((d: Dog) => d.getID().valueOf() === dog.id);

    expect(result).toBeDefined();
    expect(result?.getName().valueOf()).toEqual('Max');
    expect(result?.getBreed().valueOf()).toEqual('Dalmatian');
  });
});

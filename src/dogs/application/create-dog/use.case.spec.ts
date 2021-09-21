import { mock } from 'jest-mock-extended';

import { DogCreate } from '@/dogs/application/create-dog/use.case';
import Dog from '@/dogs/domain/dog';
import MockDogRepository from '@/dogs/infrastructure/mock.dog.repository';
import DogId from '@/dogs/domain/dog.id';
import DogName from '@/dogs/domain/dog.name';
import DogBreed from '@/dogs/domain/dog.breed';
import DogDate from '@/dogs/domain/dog.date';
import EventBus from '@/shared/domain/event-bus/event.bus';

let dogs: any = [];

describe('create-dog', () => {
  it('should create a dog', async () => {
    const dog = {
      id: '2806698',
      name: 'Max',
      breed: 'Dalmatian'
    };

    const mockDogRepository = new MockDogRepository(dogs);

    const dogCreate = new DogCreate(mockDogRepository, mock<EventBus>());

    await dogCreate.main({
      dogId: DogId.fromValue(dog.id),
      dogName: DogName.fromValue(dog.name),
      dogBreed: DogBreed.fromValue(dog.breed),
      dogDate: DogDate.fromValue(new Date())
    });

    const result = dogs.find((d: Dog) => d.getID().getValue() === dog.id);

    expect(result).toBeDefined();
    expect(result?.getName().getValue()).toEqual('Max');
    expect(result?.getBreed().getValue()).toEqual('Dalmatian');
  });
});

import { inject, injectable } from 'inversify';

import { AppContainer } from '@/shared/infrastructure/d-injection'
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { EventBus } from '@/shared/domain/event-bus/event.bus';

import { DogRepository } from '@/dogs/domain/dog.repository';
import { Dog } from '@/dogs/domain/dog';
import { DogId } from '@/dogs/domain/dog.id';
import { DogName } from '@/dogs/domain/dog.name';
import { DogBreed } from '@/dogs/domain/dog.breed';
import { DogDate } from '@/dogs/domain/dog.date';
import { DogRaceInvalid } from '@/dogs/domain/exceptions/dog.breed.invalid';

import { FindBreedQuery } from '@/breeds/application/find-breed/query';


type Params = {
  dogId: DogId;
  dogName: DogName;
  dogBreed: DogBreed;
  dogDate: DogDate;
}

@injectable()
export class CreateDogUseCase implements UseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository,
    @inject(TYPES.EventBus) private readonly eventBus: EventBus
  ) { }

  async main(params: Params) {
    const dog = Dog.create(
      params.dogId,
      params.dogName,
      params.dogBreed,
      params.dogDate
    );

    if (!await this.checkIfBreedExists(params.dogBreed)) {
      throw new DogRaceInvalid(params.dogBreed.valueOf());
    }

    await this.dogRepository.save(dog);

    await this.eventBus.publish(dog.pullDomainEvents());
  }

  private async checkIfBreedExists(dogBreed: DogBreed): Promise<boolean> {
    try {
      const queryBus = AppContainer.get<QueryBus>(TYPES.QueryBus);
      await queryBus.ask(new FindBreedQuery(dogBreed.valueOf()));
    } catch (error) {
      return false;
    }
    return true;
  }
}

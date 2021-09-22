import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { DogId } from '@/dogs/domain/dog.id';
import { DogDeleteCommand } from '@/dogs/application/delete-dog/command';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { DogNotFound } from '@/dogs/domain/exceptions/dog.not.found';

// use case DDD: delete dog
@injectable()
export class DeleteDogUseCase {
  constructor(
    @inject(TYPES.DogRepository) private readonly dogRepository: DogRepository
  ) {}

  async main(command: DogDeleteCommand) {
    const dogId = DogId.fromValue(command.getId());

    const result = await this.dogRepository.delete(dogId);

    if (!result) {
      throw new DogNotFound(dogId.getValue());
    }

    // Domain event
    // this.eventBus.publish(new DogUpdate(dog));
  }
}

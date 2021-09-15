import { injectable } from 'inversify';
import mongoose from 'mongoose';
import DogModel from '@/app/dogs/infrastructure/mongoose/dog.model';
import DogRepository from '../domain/ports/dog.repository';
import Dog from '../domain/dog';
import dogId from '../domain/dog.id';

// ports/repositories
@injectable()
export default class MongoDogRepository implements DogRepository {
  async save(dog: Dog): Promise<void> {
    await DogModel.create({
      uuid: dog.getID().getValue(),
      name: dog.getName().getValue(),
      race: dog.getRace().getValue(),
      created_at: dog.getDate().getValue()
    });
  }
  async update(dog: Dog): Promise<boolean> {
    const result = await DogModel.updateOne(
      {
        uuid: dog.getID().getValue()
      },
      {
        name: dog.getName().getValue(),
        race: dog.getRace().getValue()
      }
    );
    return result.modifiedCount > 0;
  }
  async delete(dog: Dog): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findById(id: dogId): Promise<Dog | null> {
    const result: any = await DogModel.findOne({
      uuid: id.getValue()
    });

    return result ? this.fromPrimitives(result) : null;
  }
  async findAll(): Promise<Dog[]> {
    throw new Error('Method not implemented.');
  }
  private fromPrimitives(result: any): Dog {
    return Dog.fromPrimitives(
      result.uuid,
      result.name,
      result.race,
      result.created_at
    );
  }
}

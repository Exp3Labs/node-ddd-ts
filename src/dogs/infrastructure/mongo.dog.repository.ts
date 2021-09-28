import { injectable } from 'inversify';
import { DogModel } from '@/dogs/infrastructure/mongoose/dog.model';
import { DogRepository } from '@/dogs/domain/dog.repository';
import { Dog } from '@/dogs/domain/dog';
import { DogId } from '@/dogs/domain/dog.id';

@injectable()
export class MongoDogRepository implements DogRepository {
  async save(dog: Dog): Promise<void> {
    await DogModel.create({
      uuid: dog.getID().valueOf(),
      name: dog.getName().valueOf(),
      breed: dog.getBreed().valueOf(),
      created_at: dog.getDate().valueOf()
    });
  }
  async update(dog: Dog): Promise<boolean> {
    const result: any = await DogModel.updateOne(
      {
        uuid: dog.getID().valueOf()
      },
      {
        name: dog.getName().valueOf(),
        breed: dog.getBreed().valueOf()
      }
    );
    return result.modifiedCount > 0;
  }
  async delete(id: DogId): Promise<boolean> {
    const result: any = await DogModel.deleteOne({
      uuid: id.valueOf()
    });

    return result.deletedCount > 0;
  }
  async findById(id: DogId): Promise<Dog | null> {
    const result: Object = await DogModel.findOne({
      uuid: id.valueOf()
    }).lean();

    return result ? this.fromPrimitives(result) : null;
  }
  async findAll(): Promise<Dog[]> {
    const result: Object[] = await DogModel.find({}).lean();
    return result.map(this.fromPrimitives);
  }
  private fromPrimitives(result: any): Dog {
    return Dog.fromPrimitives(
      result.uuid,
      result.name,
      result.breed,
      result.created_at
    );
  }
}

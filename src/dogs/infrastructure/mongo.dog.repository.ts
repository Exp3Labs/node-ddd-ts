import { injectable } from 'inversify';
import DogModel from '@/dogs/infrastructure/mongoose/dog.model';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import Dog from '@/dogs/domain/dog';
import dogId from '@/dogs/domain/dog.id';

// ports/repositories
@injectable()
export default class MongoDogRepository implements DogRepository {
  async save(dog: Dog): Promise<void> {
    await DogModel.create({
      uuid: dog.getID().getValue(),
      name: dog.getName().getValue(),
      breed: dog.getRace().getValue(),
      created_at: dog.getDate().getValue()
    });
  }
  async update(dog: Dog): Promise<boolean> {
    const result: any = await DogModel.updateOne(
      {
        uuid: dog.getID().getValue()
      },
      {
        name: dog.getName().getValue(),
        breed: dog.getRace().getValue()
      }
    );
    return result.modifiedCount > 0;
  }
  async delete(id: dogId): Promise<boolean> {
    const result: any = await DogModel.deleteOne({
      uuid: id.getValue()
    });

    return result.deletedCount > 0;
  }
  async findById(id: dogId): Promise<Dog | null> {
    const result: Object = await DogModel.findOne({
      uuid: id.getValue()
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

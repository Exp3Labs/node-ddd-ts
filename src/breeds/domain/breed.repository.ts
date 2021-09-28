import { Breed } from "@/breeds/domain/breed";
import { BreedName } from "@/breeds/domain/breed.name";

export interface BreedRepository {
  findBreedByName(breedName: BreedName): Promise<Breed | null>;
}

export class DogRaceInvalid extends Error {
  constructor(breed: string) {
    super(`The breed ${breed} is invalid`);
  }
}

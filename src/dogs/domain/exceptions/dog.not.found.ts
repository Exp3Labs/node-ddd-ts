export class DogNotFound extends Error {
  constructor(id: string) {
    super(`Dog ${id} is not found`);
  }
}

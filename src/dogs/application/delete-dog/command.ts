// CQRS command (from params)
export class DogDeleteCommand {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

// CQRS command (from params)
export default class DogCreatorCommand {
  private id: string;
  private name: string;
  private race: string;

  constructor(id: string, name: string, race: string) {
    this.id = id;
    this.name = name;
    this.race = race;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getRace(): string {
    return this.race;
  }
}

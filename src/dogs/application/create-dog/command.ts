import Command from "@/shared/domain/command-bus/command";

export default class DogCreateCommand implements Command {
  private id: string;
  private name: string;
  private breed: string;

  constructor(id: string, name: string, breed: string) {
    this.id = id;
    this.name = name;
    this.breed = breed;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getBreed(): string {
    return this.breed;
  }

}

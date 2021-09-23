// CQRS command (from params)
import { Command } from '@/shared/domain/cqrs/command-bus/command';

export class DogUpdateCommand implements Command {
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

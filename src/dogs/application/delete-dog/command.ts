// CQRS command (from params)
import { Command } from '@/shared/domain/cqrs/command-bus/command';

export class DogDeleteCommand implements Command {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

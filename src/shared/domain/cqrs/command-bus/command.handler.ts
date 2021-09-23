import { Command } from '@/shared/domain/cqrs/command-bus/command';

export interface CommandHandler<T extends Command> {
  subscribedTo(): Command;
  handle(command: T): Promise<void>;
}

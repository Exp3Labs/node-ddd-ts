import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { CommandNotRegistered } from '@/shared/domain/cqrs/command-bus/command.not.registered';

export class InMemoryCommandBus implements CommandBus {
  private commandHandlersMap: Map<Command, CommandHandler<Command>>;

  constructor(commandHandlers: Array<CommandHandler<Command>>) {
    this.commandHandlersMap = this.formatHandlers(commandHandlers);
  }

  async dispatch(command: Command): Promise<void> {
    const handler = this.search(command);

    await handler.handle(command);
  }

  private formatHandlers(
    commandHandlers: Array<CommandHandler<Command>>
  ): Map<Command, CommandHandler<Command>> {
    const handlersMap = new Map();

    commandHandlers.forEach((commandHandler) => {
      handlersMap.set(commandHandler.subscribedTo(), commandHandler);
    });

    return handlersMap;
  }

  private search(command: Command): CommandHandler<Command> {
    const commandHandler = this.commandHandlersMap.get(command.constructor);

    if (!commandHandler) {
      throw new CommandNotRegistered(command);
    }

    return commandHandler;
  }
}

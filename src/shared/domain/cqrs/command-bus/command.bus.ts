import { Command } from '@/shared/domain/cqrs/command-bus/command';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
}

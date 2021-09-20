import Command from "@/shared/domain/command-bus/command";

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
}

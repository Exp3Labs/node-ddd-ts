import { injectable } from "inversify";
import pino from "pino";
import Logger from "@/shared/domain/ports/logger";

@injectable()
export default class PinoLogger implements Logger {

  private options: any;

  constructor() {
    this.options = {
      prettyPrint: {
        levelFirst: true
      }
    };
  }

  info(message: string): void {
    const logger = pino(this.options);
    logger.info(message);
  }

  warn(message: string): void {
    pino(this.options).warn(message);
  }

  error(message: string): void {
    pino(this.options).error(message);
  }

  fatal(message: string): void {
    pino(this.options).fatal(message);
  }

}
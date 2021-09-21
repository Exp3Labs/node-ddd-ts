import { injectable } from 'inversify';
import pino from 'pino';
import Logger from '@/shared/domain/logger';

@injectable()
export default class PinoLogger implements Logger {

  private options: pino.LoggerOptions;

  constructor() {
    this.options = {
      prettyPrint: {
        colorize: true,
        ignore: 'hostname'
      }
    };
  }

  info(message: string): void {
    pino(this.options).info(message);
  }

  warn(message: string): void {
    pino(this.options).warn(message);
  }

  error(message: string): void {
    pino(this.options).error(message);
  }

}

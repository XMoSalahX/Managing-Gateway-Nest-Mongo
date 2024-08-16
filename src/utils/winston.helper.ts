import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { transports } from 'winston';

export const AppOptions = {
  cors: true,
  logger: WinstonModule.createLogger({
    transports: [
      new transports.File({
        filename: 'logs/Combined-' + new Date(Date.now()).toDateString() + '.log',
        level: 'info',
        handleExceptions: true,
      }),
      new transports.File({
        filename: 'logs/Errors-' + new Date(Date.now()).toDateString() + '.log',
        level: 'error',
      }),
      new transports.Console(),
    ],
    exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],

    format: winston.format.combine(
      winston.format.timestamp({
        format: 'DD/MM/YYYY, HH:mm:ss',
      }),
      winston.format.printf(
        error => `[NEST] --> ${[error.timestamp]}  [${error.context}] :  ${error.level}: ${error.message}`,
      ),
      winston.format.colorize({
        all: true,
        colors: { info: 'green', error: 'red' },
      }),
    ),
  }),
};

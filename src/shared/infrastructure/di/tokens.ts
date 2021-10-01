import { Token } from 'typedi';

import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { Response } from '@/shared/domain/cqrs/query-bus/response';
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';

export const QueryHandlerToken = new Token<QueryHandler<Query, Response>>(
  'query-handler'
);

export const CommandHandlerToken = new Token<CommandHandler<Command>>(
  'command-handler'
);

export const QueryBusToken = new Token<QueryBus>('query-bus');

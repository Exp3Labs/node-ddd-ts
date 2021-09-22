import 'reflect-metadata';
import { mongooseConnection } from '@/shared/infrastructure/database/mongoose.database';
import { initSubscribers } from '@/shared/infrastructure/event-bus/index';
import { startKoa } from '@/shared/infrastructure/framework/koa.framework';

export const init = async () => {
  try {
    await mongooseConnection();
    await initSubscribers();
    await startKoa();
  } catch (error: any) {
    console.log(`${error}`);
  }
};

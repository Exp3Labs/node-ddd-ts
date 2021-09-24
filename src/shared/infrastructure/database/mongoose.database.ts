import mongoose from 'mongoose';
import { MONGO_DB } from '@/shared/infrastructure/config';

export const mongooseConnection = async () => {
  const uri: string =
    MONGO_DB.username && MONGO_DB.password
      ? `mongodb://${MONGO_DB.hostname}:${MONGO_DB.password}@${MONGO_DB.hostname}:${MONGO_DB.port}/${MONGO_DB.database}`
      : `mongodb://${MONGO_DB.hostname}:${MONGO_DB.port}/${MONGO_DB.database}`;

  const publicURI = `${MONGO_DB.hostname}:${MONGO_DB.port}/${MONGO_DB.database}`;

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${publicURI}`);
  });

  mongoose.connection.on('error', (err: string) => {
    console.log('Mongoose default connection error: ' + err);
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });

  await mongoose.connect(uri, {});
};

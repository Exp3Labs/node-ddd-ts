import mongoose from 'mongoose';
import {
  MONGODB_HOSTNAME,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_USERNAME,
  MONGODB_PASSWORD
} from '@/shared/infrastructure/config';

const connect = async () => {
  const uri: string =
    MONGODB_USERNAME && MONGODB_PASSWORD
      ? `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOSTNAME}:${MONGODB_PORT}/${MONGODB_DATABASE}`
      : `mongodb://${MONGODB_HOSTNAME}:${MONGODB_PORT}/${MONGODB_DATABASE}`;

  const publicURI = `${MONGODB_HOSTNAME}:${MONGODB_PORT}/${MONGODB_DATABASE}`;

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

  return publicURI;
};

export default connect;

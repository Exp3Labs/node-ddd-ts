declare const process: any;

const env = process.env;

export const PROJECT = {
  name: env.PROJECT_NAME,
  mode: env.PROJECT_MODE
};

export const SERVER = {
  hostname: env.SERVER_HOSTNAME,
  port: env.SERVER_PORT
};

export const SWAGGER = {
  isPublic: env.SWAGGER_IS_PUBLIC,
  html: env.SWAGGER_HTML_ENDPOINT,
  json: env.SWAGGER_JSON_ENDPOINT
};

export const JWT = {
  secretKey: env.JWT_SECRET_KEY
};

export const MONGO_DB = {
  hostname: env.MONGODB_HOSTNAME,
  port: env.MONGODB_PORT,
  database: env.MONGODB_DATABASE,
  username: env.MONGODB_USERNAME,
  password: env.MONGODB_PASSWORD
};

export const EVENT_BUS_RABBITMQ = {
  hostname: env.EVENT_BUS_RABBITMQ_HOSTNAME,
  port: env.EVENT_BUS_RABBITMQ_PORT,
  username: env.EVENT_BUS_RABBITMQ_USERNAME,
  password: env.EVENT_BUS_RABBITMQ_PASSWORD,
  queue: env.EVENT_BUS_RABBITMQ_QUEUE,
  exchange: env.EVENT_BUS_RABBITMQ_EXCHANGE,
  retries: env.EVENT_BUS_RABBITMQ_RETRIES | 5,
  interval: env.EVENT_BUS_RABBITMQ_INTERVAL | 1000
};

export const TTL = {
  day: 86400,
  week: 604800,
  month: 2592000,
  bimester: 5184000,
  trimester: 7776000,
  semester: 15552000,
  year: 31104000
};

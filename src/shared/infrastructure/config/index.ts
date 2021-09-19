declare var process: any;

const env = process.env;

export const PROJECT_MODE: string | undefined = env.PROJECT_MODE;

export const PROJECT_NAME: string | undefined = env.PROJECT_NAME;

export const SERVER_HOSTNAME: string | undefined = env.SERVER_HOSTNAME;

export const SERVER_PORT: string | undefined = env.SERVER_PORT;

export const SWAGGER_HOSTNAME: string | undefined = env.SWAGGER_HOSTNAME;

export const SWAGGER_API_DOCS: string | undefined = env.SWAGGER_API_DOCS;

export const JWT_SECRET_KEY: any = env.JWT_SECRET_KEY;

export const MONGODB_HOSTNAME: string | undefined = env.MONGODB_HOSTNAME;

export const MONGODB_PORT: string | undefined = env.MONGODB_PORT;

export const MONGODB_DATABASE: string | undefined = env.MONGODB_DATABASE;

export const MONGODB_USERNAME: string | undefined = env.MONGODB_USERNAME;

export const MONGODB_PASSWORD: string | undefined = env.MONGODB_PASSWORD;

export const TTL: object | undefined = {
  day: 86400,
  week: 604800,
  month: 2592000,
  bimester: 5184000,
  trimester: 7776000,
  semester: 15552000,
  year: 31104000
};

const PORT = Number((process.env.PORT as string) || '3000');
const NODE_ENV: string = process.env.NODE_ENV || 'development';
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || '';
const TOKEN_EXPIRATION_TIME: string = process.env.TOKEN_EXPIRE_TIME || '1d';
const HASH_ROUND = Number(process.env.HASH_ROUND || '10');
const DATABASE_URL: string = process.env.DATABASE_URL as string;
const API_VERSION: string = process.env.API_VERSION || 'v1';
const DEFAULT_API_VERSION: string = process.env.DEFAULT_API_VERSION || '1';

export const envConfig = {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  TOKEN_EXPIRATION_TIME,
  HASH_ROUND,
  DATABASE_URL,
  API_VERSION,
  DEFAULT_API_VERSION,
};

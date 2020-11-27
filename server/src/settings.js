import dotenv from 'dotenv';
dotenv.config()

export const testEnvVar = process.env.TEST_ENV_VAR
export const PSQL_CONNECTION_STRING = process.env.PSQL_CONNECTION_STRING
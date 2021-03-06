import { Pool } from 'pg';
import dotenv from 'dotenv';
import { PSQL_CONNECTION_STRING } from '../settings';
dotenv.config();

export const pool = new Pool({
    connectionString: PSQL_CONNECTION_STRING,
    // Only when deploying to heroku
    // Else, comment
    /*
    ssl: {
        rejectUnauthorized: false
    }*/
});
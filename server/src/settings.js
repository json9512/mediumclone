import dotenv from 'dotenv';
import Auth0Strategy from 'passport-auth0';
dotenv.config()

// setup strategy for passport
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done){
        return done(null, profile);
    }
);

export const passportStrategy = strategy;

export const PSQL_CONNECTION_STRING = process.env.PSQL_CONNECTION_STRING;
export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
export const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const AUTH0_CALLBACK_URL = process.env.AUTH0_CALLBACK_URL;
export const TEST_USERNAME = process.env.TEST_USERNAME;
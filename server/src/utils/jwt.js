import jwt from 'jsonwebtoken';
import {TOKEN_SECRET, TOKEN_LIFE} from '../settings';

export const generateAccessToken = (username) => {
    return jwt.sign(username,TOKEN_SECRET, {expiresIn: TOKEN_LIFE});
};


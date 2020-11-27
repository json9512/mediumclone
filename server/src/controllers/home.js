import { restore } from 'sinon';
import {testEnvVar} from '../settings';

export const indexPage = (req, res) => {
    return res.status(200).json({title: testEnvVar})
}
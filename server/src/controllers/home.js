import {testEnvVar} from '../settings';

export const indexPage = (req, res) => {
    return res.render('index', {title: testEnvVar})
}
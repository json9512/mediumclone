import {testEnvVar} from '../settings';

export const indexPage = (req, res) => {
    return res.render('home', {title: testEnvVar})
}
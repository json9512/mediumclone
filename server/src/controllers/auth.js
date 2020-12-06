import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from '../settings';
import querystring from 'querystring';

export const logoutFunc = (req, res) => {
    if (process.env.NODE_ENV === 'test'){
        res.redirect('/');
        return;
    };

    req.logOut();

    let returnTo = req.protocol + "://" + req.hostname;
    const port = req.connection.localPort;

    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo = process.env.NODE_ENV === "production" 
        ? `${returnTo}/`
        : `${returnTo}:${port}/`
    };

    const logoutUrl = new URL(
        `https://${AUTH0_DOMAIN}/v2/logout/`
    );

    const searchString = querystring.stringify({
        returnTo: returnTo,
        client_id: AUTH0_CLIENT_ID
    });
    
    logoutUrl.search = searchString;

    res.redirect(logoutUrl);
}
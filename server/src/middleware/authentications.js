import {TEST_USERNAME} from '../settings';

export const isAuthenticated = (req, res, next) => {
  if (process.env.NODE_ENV === 'production'){
    // Passport's auth0 authentication check
    res.locals.isAuthenticated = req.isAuthenticated();
  }else{
    // For test mode
    req.user = {_json: {nickname: TEST_USERNAME}}
  }

  next();
}

export const isSecured = (req, res, next) => {
    if (req.user) {
      return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
  };
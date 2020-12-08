import {TEST_USERNAME} from '../settings';

export const isAuthenticated = (req, res, next) => {
  if (process.env.NODE_ENV !== 'test'){
    // Passport's auth0 authentication check
    res.locals.isAuthenticated = req.isAuthenticated();
  }else{
    // For test mode
    req.user = {_json: {nickname: TEST_USERNAME, email_verified: true, picture: "/images/profile/r2.png"}}
  }

  next();
}

export const isSecured = (req, res, next) => {
    if (req.user) {
      // Check if user email is verified
      if (req.user._json.email_verified){
        return next();
      }
      res.render('error');
      return;
    }
    
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
  };
export const isAuthenticated = (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
}

export const isSecured = (req, res, next) => {
    if (req.user) {
      return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
  };
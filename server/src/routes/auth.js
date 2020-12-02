import express from 'express';
import passport from 'passport';
import {logoutFunc} from '../controllers';


const router = express.Router();

/* login */
router.get('/login', 
    passport.authenticate('auth0', {
        scope: "openid email profile"
    }), (req, res) => {
        res.redirect('/')
    }
);

// Call back for Auth0
router.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user, info) => {
        // If error
        if (err) {
            return next(err);
        }
        
        // If user not found
        if (!user){
            return res.redirect('/login');
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }        
            
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || "/");
        })
    })(req, res, next);
});

/* logout */
router.get('/logout', logoutFunc)

export default router;
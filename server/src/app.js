import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import expressSession from 'express-session';
import passport from 'passport';
import {
    passportStrategy
} from './settings';

import {isAuthenticated, isSecured} from './middleware'

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import mypostsRouter from './routes/myposts';
import editorRouter from './routes/editor';
import postRouter from './routes/post';
import likesRouter from './routes/likes';

const app = express();

// HTTP Header settings with helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "https:", "data"]
        }
    }
}));

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Logger with morgan
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use express-session middleware before routes
// Setup session config for express-session
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
}

if (app.get('env') === 'production'){
    session.cookie.secure = true;
    app.set('trust proxy', 1);
}

app.use(expressSession(session));

// Use passport
passport.use(passportStrategy);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null, user);
})

app.use(isAuthenticated)


// Routes
app.use('/', authRouter);
app.use('/', indexRouter);


app.use('/users', isSecured, usersRouter);
app.use('/myposts', isSecured, mypostsRouter);
app.use('/editor', isSecured, editorRouter);


app.use('/post', postRouter);
app.use('/like', likesRouter);

// Catch Errors
app.use((err, req, res, next) => {
    res.status(400).json({error: err.stack});
});

// Redirect other none existing routes to home
app.get('*', (req, res, next) => {
    res.redirect('/')
});

module.exports = app;
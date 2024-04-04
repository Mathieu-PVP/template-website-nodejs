
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const app = express();

app.set('port', process.env.APP_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'static')));

const { loginAuth } = require('./config/passport');
loginAuth(passport);

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.APP_SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (3600000) * (process.env.APP_SESSION_COOKIE_MAXAGE || 12) // APP_SESSION_COOKIE_MAXAGE sa valeur par défaut est 12 et est en heures
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    req.mailer_transporter = require('./config/mailer');
    res.locals.SITE_NAME = process.env.APP_NAME || null; 
    res.locals.USER = req.user || null;
    next();
});

app.use('/', require('./routes/index'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/auth', require('./routes/auth'));

app.listen(app.get('port'), () => {
    console.log('Application lancée sur le port : ', app.get('port'));
});
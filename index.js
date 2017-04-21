/*
 * pull in server
 */

const express = require('express');
 
/*
 * pull in authorization requirements
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/*
 * pull in middlewares
 */
const expressSession = require('express-session');
const parser = require('body-parser');

/*
 * implementation
 */
const app = express();

const router = require('./routes');

/*
 *	implement middlewares
 */
app.use(expressSession({
	secret: 'FOBAR'
}));
app.use(parser.json())

/*
 * implement passport methods
 */
passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});

/*
 *	passport strategies, middleware
 */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    console.log('in localstrategy');
    console.log(email, password);
    if (!email || !password) {
        return done('f-ed up', {}, {});
        // done(err, user, info)
    }

    console.log('ABOUT TO BE DONE');
    return done(null, {user: 'Taq'});
}));

/*
 *	initialize passport
 */
app.use(passport.initialize());
app.use(passport.session());

/*
 * login route
 */
app.post('/auth/login', (request, response, next) => {
	console.log('IN /auth/login');

    passport.authenticate('local', (err, user, info) => {
    	console.log('IN passport.authenticate')
        if (err) console.log(err);
        if (!user) console.log(user);

        request.logIn(user, (err) => {
        	console.log('LOGGED IN')
            if (err) return next(err);
            console.log('SESSION')
            console.log(request.session)
            // if we are here, user has logged in!
            response.header('Content-Type', 'application/json');

            response.send({
                success: true,
            });
        });
    })(request, response, next);

});



app.use('/', express.static('./public'));

// app.get('/api/info', passport.authenticate('local'), (request, response) => {

// 	response.header('Content-Type', 'application/json');
// 	response.send({
// 	    "message": "Hello, Wrold!",
// 	    "success": true
// 	});

// });

app.use('/api', router);

app.listen(3000, () => {
	console.log('LOL')
});
/*
 * pull in server
 */

const express = require('express');
const db = require('sqlite');
const DB_NAME = './database.sqlite';
const DB = require ('./DB.js');
 
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

app.use('/', express.static('./public'));

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
    if (!email || !password) {
        return done('f-ed up', {}, {});
        // done(err, user, info)
    }
    db.get(`SELECT * FROM Users WHERE email = '${email}' AND password = '${password}';`)
        .then((data) => {
            if (!data) {
                return done(true, null);
            }
            return done(false, data);
        })
        .catch((e) => {
            return done(true, null, e)
        })
    

    // return done(null, {user: 'Taq'});
}));

/*
 *	initialize passport
 */
app.use(passport.initialize());
app.use(passport.session());

/*
 * login route
*/
 app.use('/api', router)


app.post('/auth/login', (request, response, next) => {
	console.log('IN /auth/login', request.body);

    passport.authenticate('local', (err, user, info) => {
    	console.log('IN passport.authenticate', err, user, info)
        if (err || !user) {
            response.status(403);
            response.send({success: false});
            console.log('here')
            return;
        }

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

app.use((request, response, next) => {
    if (request.isAuthenticated()) {
        next();
    }
    else {
        response.status(403);
        response.send({success: false})
    }
})


// app.post('/auth/signup', (request, response, next) => {
//     console.log('IN /auth/signup');

//     passport.authenticate('local', (err, user, info) => {
//         console.log('IN passport.authenticate')
//         if (err) console.log(err);
//         if (!user) console.log(user);

//         request.logIn(user, (err) => {
//             console.log('LOGGED IN')
//             if (err) return next(err);
//             console.log('SESSION')
//             console.log(request.session)
//             // if we are here, user has logged in!
//             response.header('Content-Type', 'application/json');

//             response.send({
//                 success: true,
//             });
//         });
//     })(request, response, next);
    
// });

//get all users for following (allows users to select others to follow)

app.get('/getAllUsers', (request, response) =>{
    console.log('in get all users');
    DB.getAllUsers().then((users)=>{
        response.setHeader('Content-Type', 'application/json')
        response.send(users)
    })
});

app.get ('/getPostFeed', (request, response) =>{
    console.log("get post feed DB function");
    DB.getfollowedUsers(request.user.userid)
    .then((followedUsers)=>{
        console.log("Following these users", followedUsers);
        let feed = [];
        for (let i = 0; i < followedUsers.length; i++){
            feed.push(DB.getFeed(followedUsers[i].followed));
        };
        Promise.all(feed).then((feed)=>{
            response.setHeader('Content-Type', 'application/json')
            response.send(feed)
        })
    })
});






app.get('/view', (req,res)=>{
    db.get('SELECT * FROM Users')
        .then((v) => {
            res.send(v);
        })
})

app.get('/current/user', (request, response) => {
    if (request.user) {
        response.send(request.user)
    }
    else {
        response.send({})
    }
})




// app.get('/api/info', passport.authenticate('local'), (request, response) => {

// 	response.header('Content-Type', 'application/json');
// 	response.send({
// 	    "message": "Hello, Wrold!",
// 	    "success": true
// 	});

// });

// app.post('/api', router);

const port = 3000;

Promise.resolve()
    .then(() => db.open(DB_NAME, {Promise}))
    .then(() => db.migrate({force: 'last'}))
    .then(() => app.listen(port))
    .then(() => {console.log(`Server started on port 3000`)})
    .catch(err => console.error(err.stack))

const express = require('express');
const parser = require('body-parser');
const DB = require ('./DB.js');
const db = require('sqlite');
const session = require('express-session');
const DB_NAME = './database.sqlite';

const router = express.Router();
const app = express();

const passport = require('./passport')

router.use(parser.json());
router.use(session({secret: 'FOBAR',resave: true,saveUninitialized: true
}));


router.use(passport.initialize());
router.use(passport.session());


router.post('/login', (request, response, next) => {
	 passport.authenticate('local', (err, user, info) => {
            if (err || !user) {
               next()
            }

        request.logIn(user, (err) => {
                // console.log('now in req login', err)
                if (err) return next(err);
                response.header('Content-Type', 'application/json');
                response.send({
                    success: true,
                    id: user.id
                })
                next()

            });
        })(request, response, next);
    });//END OF LOGIN POST ROUTE



app.use((request, response, next) => {
        if (request.isAuthenticated()) {
            console.log('user is authenticated')
            next();
            return ;
        }

        response.header('Content-Type', 'application/json');
        response.status(403);
        response.send({
            success: false,
        })
    })



router.post('/signup', (request, response) => {
	const args = request.body;
	return db.run(`INSERT into Users (username, email, password) VALUES ('${args.Username}', '${args.Email}','${args.Pass}');`)
  	.then(() => {
			response.send({success: true})
		})
		.catch((e) => {
			console.log(e)
		})
     
});

router.get('/instagram', (request, response) => {
     console.log("We made it", request.body)
    const args = request.body;

    
        db.all(`SELECT
                    Users.username AS username,
                    Users.profile_photo AS profile_photo,
                    Posts.photolink AS photolink,
                    Posts.caption AS caption,
                    Posts.date_time
                FROM users
                    INNER JOIN Following ON Following.following_id = Users.id
                    INNER JOIN Posts ON Posts.user_id = Users.id
                WHERE Following.user_id = ${args.user_id}`)
                .then(v => {
                     // console.log(v)
                 return response.send(v)
                    })
        .catch((v) => {
            console.log(v)
        })

});

router.get('/profile', (request, response) => {
     console.log("We made it", request.body)
    const args = request.body;

    
        db.all(`SELECT id, username, profile_photo 
            FROM Users 
            WHERE email IS '${args.Email}'`)
                .then(v => {
                     // console.log(v)
                 return response.send(v)
                    })
        .catch((v) => {
            console.log(v)
        })
});

Promise.resolve()
    .then(() => db.open(DB_NAME, {Promise}))
    .catch(err => console.log(err.stack))



module.exports = router


Promise.resolve()
    .then(() => db.open(DB_NAME, {Promise}))
    .catch(err => console.log(err.stack))



module.exports = router

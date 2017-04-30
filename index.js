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
// const passport = require('./passport.js');
// const LocalStrategy = require('passport-local').Strategy;

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
console.log("About to hit api route")
 app.use('/api', router)

 app.use((request, response, next) => {
    if (request.isAuthenticated()) {
        next();
    }
    else {
        response.status(403);
        response.send({success: false})
    }
})


const port = 3000;

Promise.resolve()
    .then(() => db.open(DB_NAME, {Promise}))
    .then(() => db.migrate({force: 'last'}))
    .then(() => app.listen(port))
    .then(() => {console.log(`Server started on port 3000`)})
    .catch(err => console.error(err.stack))





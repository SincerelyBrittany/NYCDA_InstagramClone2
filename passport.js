const db = require('sqlite');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user)
});


passport.use(new LocalStrategy(
  (username, password, done) => {
    if (!username || !password) {
            return done('error', {}, {});
        }
    db.get(`SELECT id, username 
            FROM Users 
            WHERE email IS '${username}' AND password = '${password}'`)
        .then((row) => {
        if (!row || row.length === 0) return done(true, false);
                return done(null, row);
      })
      .catch(err => console.error(err.stack))
  }
));




module.exports = passport
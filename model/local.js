var passport = require('passport')
const mysql = require('./connect')
const LocalStrategy = require('passport-local').Strategy;
var authmeJS = require('authme-js')

module.exports = function(){
    passport.use(new LocalStrategy(
      function(username, password, done) {
          mysql.query('SELECT * FROM authme WHERE username="'+ username +'"', (error, results, fields) => {
               if (error) { return done(error); }
               if (!results) {
                 return done(null, false, { message: 'Incorrect username.' });
               }
               if (authmeJS.compare(password, results[0].password) === false) {
                 return done(null, false, { message: 'Incorrect password.' });
               }
               return done(null, results[0]);
          })
      }
    ));
}

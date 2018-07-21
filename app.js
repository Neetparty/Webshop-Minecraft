var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var authmeJS = require('authme-js')
const session = require('express-session')
var mysql = require('./model/connect')
const passport = require('passport')
const ms = require('./minestat')

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');
var point = require('./routes/point');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use('/', index);
app.use('/user', users);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/point', point);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//passport setup
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const query = mysql.query('SELECT * FROM authme WHERE id="'+ id +'"', (error, results, fields) => {
        done(error, results[0].id);
    })
});

require('./model/local')()


//Socket.io

/*connection.query('SELECT * FROM authme', function (error, results, fields) {
  console.log(results[0]);
});*/

//Authme
/*if (authmeJS.compare('0814463129', '$SHA$d79fb60f3d2bf173$07ab78f8983e24cc19732a44fd8f426247fe0087297f24133c6aae03476e415f')) {
  console.log('Logged in!')
} else {
  console.log('Password incorrect!')
}*/

module.exports = app;

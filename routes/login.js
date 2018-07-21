var express = require('express');
var router = express.Router();
var authmeJS = require('authme-js')
const mysql = require('../model/connect')
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;

/* GET login page. */
router.get('/', function(req, res) {
  res.render('login');
});

/* POST login page. */
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false })
);

module.exports = router;

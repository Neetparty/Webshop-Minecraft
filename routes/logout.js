var express = require('express');
var router = express.Router();
var authmeJS = require('authme-js')
const mysql = require('../model/connect')
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;

/* GET login page. */
router.get('/', function(req, res, next) {
    req.session.destroy( function ( err ) {
      res.redirect('/');
  });
});

module.exports = router;

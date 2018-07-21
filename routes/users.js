var express = require('express');
var router = express.Router();
const ms = require('../minestat')
const mysql = require('../model/connect')

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.passport){
        const user = req.session.passport.user
        mysql.query('SELECT * FROM authme WHERE id="' + user + '"', (error, results, fields) => {
            res.redirect('/user/:' + results[0].username)
        })
    } else {
        res.redirect('/')
    }
});

router.get('/:username', function(req, res, next) {
    if(req.session.passport){
        const user = req.session.passport.user
        mysql.query('SELECT * FROM authme WHERE id="' + user + '"', (error, results, fields) => {
            if(results[0].username == req.params.username || results[0].realname == req.params.username){
                res.render('user', {
                    dataUser : results[0],
                    page : 'news'
                });
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.render('user', {
            dataUser : '',
            page : 'news'
        });
    }
});

router.get('/:username/promotion', function(req, res, next) {
    if(req.session.passport){
        const user = req.session.passport.user
        mysql.query('SELECT * FROM authme WHERE id="' + user + '"', (error, results, fields) => {
            if(results[0].username == req.params.username || results[0].realname == req.params.username){
                res.render('user', {
                    dataUser : results[0],
                    page : 'promotion'
                });
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.render('user', {
            dataUser : '',
            page : 'promotion'
        });
    }
});

router.get('/:username/event', function(req, res, next) {
    if(req.session.passport){
        const user = req.session.passport.user
        mysql.query('SELECT * FROM authme WHERE id="' + user + '"', (error, results, fields) => {
            if(results[0].username == req.params.username || results[0].realname == req.params.username){
                res.render('user', {
                    dataUser : results[0],
                    page : 'event'
                });
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.render('user', {
            dataUser : '',
            page : 'event'
        });
    }
});

module.exports = router;

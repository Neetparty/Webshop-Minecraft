var express = require('express');
var router = express.Router();
const ms = require('../minestat')
const mysql = require('../model/connect')

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.passport){
        const user = req.session.passport.user
        mysql.query('SELECT * FROM authme WHERE id="' + user + '"', (error, results, fields) => {
            if(results[0].username == req.params.username || results[0].realname == req.params.username){
                res.render('point', {
                    dataUser : results[0],
                });
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
});


module.exports = router;

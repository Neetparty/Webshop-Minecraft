 var express = require('express');
var router = express.Router();
var authmeJS = require('authme-js')
const mysql = require('../model/connect')



/* GET register page. */
router.get('/', function(req, res, next) {
    res.render('register', {
        err : undefined
    })

});

/* POST register page. */
router.post('/', (req, res, next) => {
    const password = req.body.password
    const cpass = req.body.cpass
    const hashPass = authmeJS.hash(password)

    const user = req.body.username
    const email = req.body.email

    if(!user){
        res.render('register', {
            err : 'username'
        })
    }
    else if(user) {
        mysql.query('SELECT * FROM authme WHERE username="' + user + '"', (error, results, fields) => {
            if (results[0] !== undefined) {
                res.render('register', { err : 'duplicate' })
            }
            else if(!password){
                res.render('register', {
                    err : 'password'
                })
            }
            else if(password !== cpass){
                res.render('register', {
                    err : 'not match'
                })
            }
            else if(!email){
                res.render('register', {
                    err : 'email'
                })
            }

            else if(user && email && password){
                const obj = {
                    username : user,
                    realname : user,
                    password : hashPass,
                    x : 0,
                    y : 0,
                    z : 0,
                    world : 'world',
                    email : email,
                }

                const query = mysql.query('INSERT INTO authme SET ?', obj, (error, results, fields) => {
                    console.log(results);
                    console.log(error);
                    res.redirect('/login')
                })
            }
        })
    }
})

module.exports = router;

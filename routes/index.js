var express = require('express');
var router = express.Router();
const ms = require('../minestat')
const mysql = require('../model/connect')

/* GET home page. */
router.get('/', function(req, res, next) {
    ms.init('127.0.0.1', 25565, (data) => {
        if(req.session.passport){
            const user = req.session.passport.user
            mysql.query('SELECT * FROM authme WHERE id="' + user + '"', (error, results, fields) => {
                req.login(results[0].username, function(err) {
                  if (err) { return next(err); }
                });
                res.render('index', {
                    dataUser : results[0],
                    online : ms.online,
                    host : ms.address,
                    version : ms.version,
                    players : ms.current_players,
                    max_player : ms.max_players,
                    server_message : ms.motd
                });
            })
        } else {
            res.render('index', {
                dataUser : '',
                online : ms.online,
                host : ms.address,
                version : ms.version,
                players : ms.current_players,
                max_player : ms.max_players,
                server_message : ms.motd
            });
        }

    })
});

module.exports = router;

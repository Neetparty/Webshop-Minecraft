const Rcon = require('modern-rcon');

//Rcon setup
const rcon = new Rcon('localhost', 'tey0814463129')
rcon.connect()

module.exports = rcon

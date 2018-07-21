const Rcon = require('modern-rcon');

//Rcon setup
const rcon = new Rcon('localhost', 'password')
rcon.connect()

module.exports = rcon

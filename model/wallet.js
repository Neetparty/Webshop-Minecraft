const tw = require('node-twallet')

tw.login('Email', 'password', () => {
  console.log('True Wallet is Connect');
})

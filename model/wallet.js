const tw = require('node-twallet')

tw.login('Email', 'Password', () => {
  console.log('True Wallet is Connect');
})

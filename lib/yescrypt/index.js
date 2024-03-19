const Yescrypt = require('wasm-yescryptr32-hash');

module.exports = {
  initialize: function (callback) {
    Yescrypt().then(function(data){
        callback(null, data);
    })
  }
};
var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  hashPassword: function(model, attrs, options) {
    return new Promise(function(resolve, reject) {
      bcrypt.hash(model.attributes.password, null, null, function(err, hash) {
        if (err) { 
          reject(err); 
        }
        model.set('password', hash);
        resolve(hash);
      });
    });
  },
  comparePassword: function(attempted, callback) {
    bcrypt.compare(attempted, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  }
});


module.exports = User;
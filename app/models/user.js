var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('creating', this.hashPassword, this);
  },
  hashPassword: function(model, attrs, options) {
    return new Promise(function(resolve, reject) {
      var salt = bcrypt.genSaltSync(10);
      // console.log(salt, 'salt');
      bcrypt.hash(model.attributes.password, salt, null, function(err, hash) {
        if (err) { 
          console.log(err); 
        }
        model.set('password', hash);
        console.log(model.get('password'), 'hashed password');
        resolve(hash);
      });
    });
  }
  // getPassword: function() {
  //   var test = this.get('password');
  //   console.log(test, '<<<<< is the password gotten!');
  // }
});


module.exports = User;
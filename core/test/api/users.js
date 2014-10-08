/*globals describe, it*/
var
  assert = require('assert') ,
  path = require('path'),
  should = require('should'),
  api = require('../../server/api/index'),
  config = require('../../server/config/index'),
  model = require('../../server/models/index'),
  fs = require('fs'),
  setTestEnv = require('./index');

  require("mocha-as-promised")();



describe("User Api Test", function() {

   before(setTestEnv);
  // console.log("--> User Api Test <--");
  it("user add test", function () {
    var _user = {
      name: 'tester',
      email: 'tester@gmail.com',
      password: 'password',
      role: 'normal'
    };

    return api.users.add(_user).then(function (user) {
      user.get('email').should.equal('tester@gmail.com');
    });
  });

  it("user add password too short test", function () {
    var _user = {
      name: 'tester',
      email: 'tester@gmail.com',
      password: '1',
      role: 'normal'
    };

    return api.users.add(_user).otherwise(function (error) {
      // console.log('error:', error);
      error.should.be.an.Error;
    });
  });



  it("user browse test", function() {

    return api.users.browse().then(function (users) {
      users.length.should.be.above(0);
    });

  });

  it("user read not found", function () {
      var _user = {
          email: new Date().toString()
      };

      return api.users.read(_user).otherwise(function (err) {
         err.errorCode.should.equal(404);
      });
  });

  it("user find test", function () {
    var _user = {
      email: 'tester@gmail.com'
    };

    return api.users.read(_user).then(function (user) {
      // console.log("user: ", user);
      user.name.should.equal('tester');

    });
  });


  it("Duplicate user add test", function () {
    var _user = {
      name: 'tester',
      email: 'tester@gmail.com',
      password: 'password'
    };

    return api.users.add(_user).otherwise(function (error) {
      error.should.be.an.Error;
    });
  });


  it("delete user 'tester'", function () {
    var _user = {
      email: 'tester@gmail.com'
    };

    return api.users.delete(_user).then(function (result){

        return api.users.read(_user).then(function (deleteConfrim) {
            // console.log('delete result:', deleteConfrim);
        }).otherwise(function (err) {
            // console.log('err:', err);
            err.errorCode.should.equal(404);
        });
    });

  });
});
/*globals describe, it*/
var
  assert = require('assert') ,
  should = require('should'),
  api = require('../server/api');

  require("mocha-as-promised")();

describe("Subject Api Test", function () {

    it ("subject add test", function() {
        var _subject = {
            name : 'test',
            url : 'www.baidu.com',
            description: 'test subject'
        };

        return api.subject.add(_subject).then(function (subject) {
            subject.get('name').should.equal('test');
            subject.get('url').should.equal('www.baidu.com');
        });
    });

    it("browse subject test", function () {
       return api.subject.browse().then(function (subjects){
           subjects.shoud.be.above(0);
       });
    });

});

describe("User Api Test", function() {
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
      console.log('error:', error);
      error.should.be.an.Error;
    });
  });



  it("user browse test", function() {

    return api.users.browse().then(function (users) {
      users.length.should.be.above(0);
    });

  });

  it("user find test", function () {
    var _user = {
      email: 'tester@gmail.com'
    };

    return api.users.read(_user).then(function (user) {
      console.log("user: ", user);
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

    return api.users.delete(_user);

  });
});
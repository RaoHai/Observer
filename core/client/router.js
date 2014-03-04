/*global  Observer, Backbone */
(function () {
  'use strict';

  Observer.Router = Backbone.Router.extend({
    routes: {
      ''  : 'index',
      'subject' : 'subject',
      'signup' : 'signup',
      'signin' : 'login'
    },

    signup : function () {
      Observer.currentView = new Observer.Views.Signup({ el : '.signup-box'});
    },

    login : function () {
      Observer.currentView = new Observer.Views.login({ el : '.login-box'});
    },

    subject: function () {

    }

  });
}());
/*global  Observer, Backbone */
(function () {
  'use strict';

  Observer.Router = Backbone.Router.extend({
    routes: {
      ''  : 'index',
      'subject' : 'subject',
      'signup\/*' : 'signup',
      'signin\/*' : 'login',
      'admin\/*' : 'admin'
    },

    signup : function () {
      Observer.currentView = new Observer.Views.Signup({ el : '.signup-box'});
    },

    login : function () {
      Observer.currentView = new Observer.Views.Login({ el : '.login-box'});
    },

    subject: function () {

    },
    
    index : function () {
      Observer.currentView = new Observer.Views.Signup({ el : '.signup-box'});
    },

    admin : function () {
      var brands = new Observer.Collections.Brands(),
          trainings = new Observer.Collections.Trainings();
      
      $.when(
        brands.fetch(),
        trainings.fetch()
      ).then(function () {
        brands.fetch().then(function () {
          Observer.currentView = new Observer.Views.Admin({ el : '#main', brands: brands, trainings : trainings});
        });
      });
      
    }

  });
}());
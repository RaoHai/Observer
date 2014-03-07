/*global Observer, Backbone, _, JST*/
(function () {
  "use strict";

  Observer.TemplateView = Backbone.View.extend({
    templateName: "widget",

    template : function (data) {
      console.log("data:", this.templateName);
      return JST[this.templateName](data);
    },

    templateData : function () {
      if (this.model) {
        return this.model.toJSON();
      }

      if (this.collection) {
        return this.collection.toJSON();
      }

      return {};
    },

    render : function () {
      if (_.isFunction(this.beforeRender)) {
        this.beforeRender();
      }

      this.$el.html(this.template(this.templateData()));

      if (_.isFunction(this.afterRender)) {
        this.afterRender();
      }

      return this;
    }

  });

  Observer.View = Observer.TemplateView.extend({


  });


}());
/*global Observer, $*/
/*login.js*/
(function () {
  'use strict';

  Observer.Views.Login = Observer.View.extend({
    initialize: function () {
      this.render();
    },

    templateName: 'login',

    events: {
      'submit #login': 'submitHandler'
    },

    afterRender: function () {
      var self = this;
      this.$el.css({'opacity': 0}).animate({'opacity':1}, 500, function () {
        self.$('[name="email"]').focus();
      });
    },

    submitHandler: function (event) {
      event.preventDefault();

      var email = this.$el.find('.email').val(),
          password = this.$el.find('.password').val();
        $.ajax({
          url: '/signin',
          type: 'POST',
          data: {
            email: email,
            password: password
          },
          success: function (msg) {
            window.location.href = msg.redirect;
          },
          error: function () {

          }
        });

    }

  });


  Observer.Views.Signup = Observer.View.extend({
    
    initialize: function() {
      this.submitted = 'no';
      this.render();
    },

    templateName : 'signup',

    events : {
      'submit #signup' : 'submitHandler'
    },

    afterRender: function () {
      var self = this;

      this.$el
        .css({'opacity': 0})
        .animate({'opacity':1}, 500, function () {
          self.$('[name="name"]').focus();
        });
    },

    submitHandler: function (event) {
      event.preventDefault();
      var name = this.$('.name').val(),
          email = this.$('.email').val(),
          password = this.$('.password').val();

      this.submitted = 'yes';

      $.ajax({
        url : '/signin',
        type: 'POST',
        data: {
          name : name,
          email : email,
          password : password
        },
        success: function (msg) {
          window.location.href = msg.redirect;
        },
        error : function () {

        }
      })
    }

  });

}());
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
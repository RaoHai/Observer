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
          headers: {
            'X-CSRF-Token': $("meta[name='csrf-param']").attr('content')
          },
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
      
      Observer.Validate.check(this.$('.name'), 'name length must between 4 and 10').len(4, 10);
      Observer.Validate.check(this.$('.email'), 'Illegal Email Format').isEmail();
      Observer.Validate.check(this.$('.password'), 'Password length must greater than 8').len(8);

      if (Observer.Validate._errors.length > 0) {
        return Observer.Validate.handleErrors();
      }
      this.submitted = 'yes';

      $.ajax({
        url : '/signup',
        type: 'POST',
        headers: {
          'X-CSRF-Token': $("meta[name='csrf-param']").attr('content')
        },
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
      });
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
      Observer.currentView = new Observer.Views.Login({ el : '.login-box'});
    },

    subject: function () {

    }

  });
}());
/*global Observer, Backbone, Handlebars*/
(function () {
  "use strict";

  Observer.TemplateView = Backbone.View.extend({
    templateName: "widget",

    template : function (data) {
      return Handlebars.compile(data);
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

      this.$el.html(this.template(this.templateData()));

      return this;
    }

  });

  Observer.View = Observer.TemplateView.extend({

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
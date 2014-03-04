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
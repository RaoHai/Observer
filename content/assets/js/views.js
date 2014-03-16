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

      return this.$el;
    }

  });

  Observer.View = Observer.TemplateView.extend({


  });


}());
/*global Observer, $*/
/*login.js*/
(function () {
  'use strict';

  Observer.Views.Admin = Observer.View.extend({

    initialize: function (options) {
      var brandCollection = options.brands,
          trainingCollection = options.trainings;

      this.render();
      
      this.brandView = new Observer.Views.Brand({ el : '#brands-content', collection: brandCollection});
      this.trainingView = new Observer.Views.Training({ el : '#trainings-content', collection : trainingCollection, brands : brandCollection});
      
    },
    templateName : 'admin',
    afterRender : function () {
      console.log('afterRender')
      $(document).foundation();
    }


  });

}());
/*global Observer, $, confirm*/
/*login.js*/
(function () {
  'use strict';

  Observer.Views.Brand = Observer.View.extend({
    initialize: function () {

      this.render();
      $('#brand .csrf').val($("meta[name='csrf-param']").attr('content'));
    },

    templateName: 'brand',
    events : {
      
      'submit #create_brand': 'submitHandler'
    },

    afterRender : function () {
      var self = this;
      // this.render();
      this.collection.each(function (model) {
        var row = (new Observer.Views.BrandRow({model:model})).render();
        self.$el.find('tbody').append(row);
      });

      $(document).foundation();
      return this;
    },

    submitHandler : function (event) {
      event.preventDefault();
       console.log(this.$('.name'))
      Observer.Validate.clean();
      Observer.Validate.check(this.$('.name'), 'name cannot be empty').notNull();
      Observer.Validate.check(this.$('.url'), 'url cannot be empty').notNull();

      if (Observer.Validate._errors.length > 0) {
        return Observer.Validate.handleErrors();
      }

      event.currentTarget.submit();
    }

  });



  Observer.Views.BrandRow = Observer.View.extend({
    tagName : "tr",
    templateName : "brand_row",
    events : {
      "click a.delete" : 'deleteHandler'
    },

    deleteHandler : function (event) {
      event.preventDefault();
      if (confirm("确认删除？")) {
        $.ajax({
          url : $(event.currentTarget).attr('href'),
          type : 'GET',
          headers : {
            'X-CSRF-Token': $("meta[name='csrf-param']").attr('content')
          },
          success : function () {
            window.location.reload();
          }
        });
      }
    }
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

      Observer.Validate.clean();
      Observer.Validate.check(this.$('.email'), 'Illegal Email Format').isEmail();
      Observer.Validate.check(this.$('.password'), 'Password length must greater than 8').len(8);

      if (Observer.Validate._errors.length > 0) {
        return Observer.Validate.handleErrors();
      }

        $.ajax({
          url: '/login',
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
          error: function (msg) {
            console.log('error:', msg);
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
      
      Observer.Validate.clean();
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
        error : function (msg) {
          console.log('error:', msg);
        }
      });
    }

  });

}());
/*global Observer, $, confirm*/
/*login.js*/
(function () {
  'use strict';

  Observer.Views.Training = Observer.View.extend({
    brands: null,
    initialize: function (options) {
      if (options.brands) {
        this.brands = options.brands;
      }
      this.render();
      $('#training .csrf').val($("meta[name='csrf-param']").attr('content'));
    },

    templateName: 'training',
    events : {
      
      'submit #create_training': 'submitHandler'
    },

    afterRender : function () {
      var self = this;
      // this.render();
      this.collection.each(function (model) {
        var row = (new Observer.Views.TrainingRow({model:model})).render();
        self.$el.find('tbody').append(row);
      });
      console.log($('#brandid'));
      self.brands.each(function (brand) {
        // console.log(brand.attr('name'));
        var option = $('<option/>').val(brand.id).html(brand.get('name'));

        option.appendTo($('#brandid'));
      });

      $(document).foundation();
      return this;
    },

    submitHandler : function (event) {
      event.preventDefault();
      console.log(this.$('.name'))
      Observer.Validate.clean();
      Observer.Validate.check(this.$('.name'), 'name cannot be empty').notNull();
      Observer.Validate.check(this.$('.url'), 'url cannot be empty').notNull();

      if (Observer.Validate._errors.length > 0) {
        return Observer.Validate.handleErrors();
      }

      event.currentTarget.submit();
    }

  });

  var ages_map = ["","学前","幼升小","小升初","中学","大学","成人"];
  var category_map = ["","特长培训","中考","高考","考研","英语","留学","资格证考"];
  var area_map = ["","北京","天津","其他"];
  Observer.Views.TrainingRow = Observer.View.extend({
    tagName : "tr",
    templateName : "training_row",
    events : {
      "click a.delete" : 'deleteHandler'
    },

    beforeRender : function () {
      console.log(this.model);
      this.model.set('ages_string', ages_map[this.model.get('ages')]);
      this.model.set('category_string', category_map[this.model.get('category')]);
      this.model.set('area_string', area_map[this.model.get('area')]);
      
    },

    deleteHandler : function (event) {
      event.preventDefault();
      if (confirm("确认删除？")) {
        $.ajax({
          url : $(event.currentTarget).attr('href'),
          type : 'GET',
          headers : {
            'X-CSRF-Token': $("meta[name='csrf-param']").attr('content')
          },
          success : function () {
            window.location.reload();
          }
        });
      }
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
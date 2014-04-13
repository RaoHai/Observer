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
      var subjectCollection = options.subjects;

      this.render();
      
      this.subjectView = new Observer.Views.Subject({ el : '.subjects-list', collection: subjectCollection});

      
    },
    templateName : 'admin',
    afterRender : function () {
      console.log('afterRender')
      $(document).foundation();
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
          url: '/login?redirect=' + $(".login-box").attr('data-redirect'),
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
/*global Observer, $ */
/*login.js*/
(function () {
   'use strict';

    Observer.Views.Subject = Observer.View.extend({
        initialize: function () {
            console.log('observer subject view initialized');
            this.render();
        },

        templateName: 'subject',

        events: {
            "submit #subject_add_form": 'submitHandler'
        },

        afterRender : function () {
            var self = this;
            this.collection.each(function (model) {
                var row = (new Observer.Views.SubjectRow({model: model})).render();
                self.$el.find('tbody').append(row);
            });
        },

        submitHandler : function (event) {
            event.preventDefault();
            var name = this.$el.find('.name').val(),
                url = this.$el.find('.url').val(),
                description = this.$el.find('.description').val();

            Observer.Validate.clean();
            Observer.Validate.check(this.$('.name'), 'name must not null').notNull();
            Observer.Validate.check(this.$('.url'), 'url must be URL').isUrl();

            console.log(Observer.Validate._errors);
            if (Observer.Validate._errors.length > 0) {
                return Observer.Validate.handleErrors();
            }

            $.ajax({
                url : '/subjects',
                type: 'POST',
                headers: {
                    'X-CSRF-Token': $("meta[name='csrf-param']").attr('content')
                },
                data : {
                    name : name,
                    url : url,
                    description: description
                },
                success: function (msg) {
                    console.log(msg);
                },
                error: function (msg) {
                    console.log('error:', msg);
                }
            })

        }


    }) ;

    Observer.Views.SubjectRow = Observer.View.extend({
        tagName : "tr",
        templateName: "subject_row",
        events: {
            "click a.delete": "deleteHandler"
        },
        initialize: function () {
            this.render();
        },

        deleteHandler : function (event) {
            event.preventDefault();
        }
    });
})
/*global  Observer, Backbone */
(function () {
    'use strict';

    Observer.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'subject': 'subject',
            'signup\/*': 'signup',
            'signin\/*': 'login',
            'admin\/*': 'admin'
        },

        signup: function () {
            Observer.currentView = new Observer.Views.Signup({ el: '.signup-box'});
        },

        login: function () {
            Observer.currentView = new Observer.Views.Login({ el: '.login-box'});
        },

        subject: function () {

        },

        index: function () {
            Observer.currentView = new Observer.Views.Signup({ el: '.signup-box'});
        },

        subjects: function () {
            Observer.currentView = new Observer.Views.Subject({ el: '.subject-box'});
        },

        admin: function () {
            var subjects = new Observer.Collections.Subjects();

            subjects.fetch().then(function (){

                Observer.currentView = new Observer.Views.Admin({ el : '.subjects-list' ,subjects: subjects});
            });

        }

    });
}());
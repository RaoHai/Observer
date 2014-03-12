/*globals _,Backbone, Validator*/
(function () {
  'use strict';

  function observerPaths() {
    var path = window.location.pathname,
        subdir = path.substr(0,path.search('/'));

    return {
      subdir : subdir,
      root: subdir
    };
  }

  var Observer = {
    Layout        :   {},
    Views         :   {},
    Collections   :   {},
    Models        :   {},
    Validate      :   new Validator(),

    paths: observerPaths(),

    currentView: null,
    router: null
  };

  _.extend(Observer, Backbone.Events);



  Observer.init = function () {
    Observer.router = new Observer.Router();

    Backbone.history.start({
      pushState: true,
      hashChange: false,
      root: '/'
    });

  };

  Observer.Validate.handleErrors = function (errors) {
    console.log(this._errors);
  };

  Observer.Validate.error = function (object) {
    this.$error.html(object).show();
    this._errors.push(object);
    this.$error.parent().addClass('error');
    return this;
  };

  Observer.Validate.clean = function () {
    this._errors = [];
  };

  Observer.Validate.check = function (targetEl, fail_msg) {

    if (typeof targetEl === 'object' && targetEl.selector) {
      this.str = targetEl.val();
      this.$el = targetEl;
      targetEl.parent().removeClass('error');
      this.$error = targetEl.parent().find('.error');
      this.$error.html('').hide();
    }

    if (typeof targetEl === 'string') {
      this.str = typeof( targetEl ) === 'undefined' || targetEl === null || (isNaN(targetEl) && targetEl.length === undefined) ? '' : targetEl+'';
    }

    this.msg = fail_msg;
    this._errors = this._errors || [];
    return this;

  };
  // Observer.Validate.check = function (validates) {
    
  //   if (validates.length) {
  //     var result = validates.reduce(function (prev, curr) {
  //       return prev && curr;
  //     });
  //   }

  // };


  window.Observer = Observer;

  window.addEventListener('load', Observer.init, false);

  
}());

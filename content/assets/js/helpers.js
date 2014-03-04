/*globals _,Backbone*/
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


  window.Observer = Observer;

  window.addEventListener('load', Observer.init, false);

}());

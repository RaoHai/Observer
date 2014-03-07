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

(function () {
  
  $(document).on('focus', 'input', function (e) {
    $(e.currentTarget).parent().find('i.fa').addClass('focus');
  });

  $(document).on('blur', 'input', function (e) {
    $(e.currentTarget).parent().find('i.fa').removeClass('focus');
  });
  
  // window.document.addEventListener("focus",function (e) {
  //   console.log(e.target.nodeName.toUpperCase);
  //   if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
  //     console.log('focus event fire.');
  //   }
  // }, true);


}());
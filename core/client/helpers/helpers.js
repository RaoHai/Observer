/*globals $, Validator, jQuery*/
(function () {
  
  $(document).on('focus', 'input', function (e) {
    $(e.currentTarget).parent().find('i.fa').addClass('focus');
  });

  $(document).on('blur', 'input', function (e) {
    $(e.currentTarget).parent().find('i.fa').removeClass('focus');
  });


  


}());
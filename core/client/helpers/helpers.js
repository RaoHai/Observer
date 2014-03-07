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
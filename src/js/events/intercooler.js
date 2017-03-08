
//we want to disable the default action of our links since intercooler
//handles the page request
$('*[data-ic-disable]').on('click', function (e) {
  e.preventDefault();
});


//add nav loader class, then remove
$('body').on('beforeSend.ic', function () {
  const nav = $('nav');
  nav.addClass('loading');
  setTimeout(function () {
    nav.removeClass('loading');
  }, 1100);
});

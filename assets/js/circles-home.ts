(function($) {

  let $wrapperCircles = $('.home .wrapper-circles');

  if ($wrapperCircles.length > 0) {
    let i = 0;
    $wrapperCircles.find('.wrapper-circle').each(function(index, value) {
      setTimeout(() => {
        $(this).addClass('animated fadeInRightBig')
      }, i*250)
      i++
    })
  }

})(jQuery)

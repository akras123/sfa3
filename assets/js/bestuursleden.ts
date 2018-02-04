(function($) {

  let $bestuursleden = $('.element.bestuursleden');
  let isMobile = false

  if (Modernizr.mq('only all and (max-width: 767px)')) {
    isMobile = true;
    $bestuursleden.find('.postBody').height('100%');
  } else {
    isMobile = false;
    calcHeight();
  }
  
  if ($bestuursleden.length > 0) {
    if (isMobile === false) {
      calcHeight();
    }
  }

	$(window).on('resize', function(e) {
    if (Modernizr.mq('only all and (max-width: 767px)')) {
      isMobile = true;
      $bestuursleden.find('.postBody').height('100%');
    } else {
      isMobile = false;
      calcHeight();
    }
	});

  function calcHeight () {
    let heights = [];
    $bestuursleden.find('.postBody').each(function (index,value) {
      heights.push($(this).height())
    });
    let highestHeight = Math.max.apply(null, heights);
    $bestuursleden.find('.postBody').height(highestHeight);
  }

})(jQuery)
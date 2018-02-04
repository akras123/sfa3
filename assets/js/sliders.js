(function($) {

	// cache DOM
	var $slider = $('.home .slider, .page .slider, .posts .slider, .post .slider');

	$slider.slick({
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 600,
		dots: true,
		arrows: false,
		fade: true
	});

})(jQuery);

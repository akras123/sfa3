(function ($) {
    var $wrapperCircles = $('.home .wrapper-circles');
    if ($wrapperCircles.length > 0) {
        var i_1 = 0;
        $wrapperCircles.find('.wrapper-circle').each(function (index, value) {
            var _this = this;
            setTimeout(function () {
                $(_this).addClass('animated fadeInRightBig');
            }, i_1 * 250);
            i_1++;
        });
    }
})(jQuery);

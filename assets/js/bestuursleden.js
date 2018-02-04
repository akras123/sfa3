(function ($) {
    var $bestuursleden = $('.element.bestuursleden');
    var isMobile = false;
    if (Modernizr.mq('only all and (max-width: 767px)')) {
        isMobile = true;
        $bestuursleden.find('.postBody').height('100%');
    }
    else {
        isMobile = false;
        calcHeight();
    }
    if ($bestuursleden.length > 0) {
        if (isMobile === false) {
            calcHeight();
        }
    }
    $(window).on('resize', function (e) {
        if (Modernizr.mq('only all and (max-width: 767px)')) {
            isMobile = true;
            $bestuursleden.find('.postBody').height('100%');
        }
        else {
            isMobile = false;
            calcHeight();
        }
    });
    function calcHeight() {
        var heights = [];
        $bestuursleden.find('.postBody').each(function (index, value) {
            heights.push($(this).height());
        });
        var highestHeight = Math.max.apply(null, heights);
        $bestuursleden.find('.postBody').height(highestHeight);
    }
})(jQuery);

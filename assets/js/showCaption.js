var showCaptions = function () {
  var caption;
  $('.content > p img').each(function () {
  	var $this = $(this);
    caption = $this.attr('alt');
  	if (caption.length > 0)
      // use .before to insert the caption before the image
      $this.after('<figcaption>' + caption + '</figcaption>');
  });
  $('.content > table img').each(function () {
  	var $this = $(this);
    caption = $this.attr('alt');
  	if (caption.length > 0)
      // use .before to insert the caption before the image
      $this.after('<figcaption>' + caption + '</figcaption>');
  });
}
showCaptions();

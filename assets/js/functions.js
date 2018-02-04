$(function() {
	"use strict";
	// cache DOM
	moment.locale('nl');

	var $body = $('body'),
			$home = $('body.home');
	if ($home.length>0) {
		setTimeout(function () {
			$home.addClass('enter');
			// $home.find('.logo').addClass('animated fadeIn');
		}, 300);
	}
	var isMobile = false;
	if (Modernizr.mq('only all and (max-width: 767px)')) {
		isMobile = true;
	} else {
		isMobile = false;
	}

	$body.scrollspy({
		target: '#main'
	});

	jQuery.validator.addMethod("validEmail", function(value, element) {
		if (value === '')
			return true;
		var str = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm,
			check = str.test(value);
		return check;
	}, "Please use a valid email address.");

	$.fn.extend({
		animateCss: function(animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			$(this).addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
			});
		}
	});

	if($(".content table").length>0 && isMobile === true){
		$("table").wrap('<div class="table-responsive"></div>');
	}
  // for mobile, close the menu in case of one page design
  // $('#main .navbar-nav a').on('click', function() {
  //   var $this = $(this);
  //   $this.parents('.collapse').toggleClass('in');
  // });


	smoothScroll(1000);

	// $(window).on('resize', function(e) {
	// 	console.log('resize');
	// });

	toTop(isMobile);
	//appear();
	$(window).scroll(function() {
		// makeMenuFixed();
		// appear();
		// make sure focus is off, to loose active color
		// $('.navbar-wrapper .navbar-nav li a').blur();
	});
	// default behaviour external links new windows
	$("a[href^='http://']").attr("target", "_blank");
	$("a[href^='https://']").attr("target", "_blank");


});


function smoothScroll(duration) {
	$('a[href^="#"]').on('click', function(event) {
		var $this = $(this);
		// check if the first character is an anchor
		if($this.data('target') === undefined) {
			if ($this.attr('href').charAt(0) === '#') {
				var target = $($this.attr('href'));
				if (target.length) {
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top
					}, duration);
				}
			}
		}
	});
}

function toTop(isMobile) {

	if (isMobile === false) {

		if (!$('#goToTop').length)
			$('body').append('<a href="#" id="goToTop"><i class="glyphicon glyphicon-chevron-up"></i></a>');

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('#goToTop').slideDown('fast');
			} else {
				$('#goToTop').slideUp('fast');
			}
		});

		$('#goToTop').click(function(e) {
			e.preventDefault();
			$("html, body").animate({
				scrollTop: 0
			}, 800);

		});
	} else {
		if ($('#goToTop').length)
			$('#goToTop').remove();
	}
}

function makeMenuFixed() {
    var navbar = $('.navbar-fixed-top'),
        header = $('header').height()-200,
        top = header,
        wScroll = $(this).scrollTop();
    if (wScroll >= top) {
        navbar.addClass('fadeIn');
        navbar.find('.navbar-brand').addClass('animated fadeInUp');
    } else {
        navbar.removeClass('fadeIn');
    }
}

function appear() {
	var wScroll = $(this).scrollTop();
	$.each($('section .animated'), function(index, value) {
		var $this = $(value);
		if (wScroll > $this.offset().top - ($(window).height() / 1.2)) {
			$this.addClass($this.data('animate-effect'));
			appearNav();
		}
	});
}

function clearInputs(form) {
	form.find('option').each(function() {
		var $this = $(this);
		$this.prop('selected', false);
	});
	form.find('textarea').each(function() {
		var $this = $(this);
		$this.val('');
	});
	form.find('input').each(function() {
		var $this = $(this);
		if ($this.val().length > 0) {
			var name = $this.attr('name'),
				type = $this.attr('type'),
				disabled = $this.attr('disabled'),
				checked = $this.is(':checked'),
				value = $this.val();
			if (type === 'text' && disabled !== 'disabled') {
				$this.val('');
			}
			if (type === 'email') {
				$this.val('');
			}
			if (type === 'password') {
				$this.val('');
			}
			if (type === 'number') {
				$this.val('');
			}
			if (type === 'checkbox') {
				$this.prop('checked', false);
			}
			if (type === 'radio') {
				$this.prop('checked', false);
			}
			if (type === 'select') {
				$this.find('option').attr('selected', false)
			}
		}
	});
}

$('.modal#confirm').on('hidden.bs.modal', function(e) {
	$('.modal#confirm .modal-body').html('');
});

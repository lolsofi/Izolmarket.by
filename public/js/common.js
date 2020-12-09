"use strict";

var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active");

					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		// листалка по стр
		$(" .scroll-link").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	}
};
var $ = jQuery;

function eventHandler() {
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect

	var x = window.location.host;
	var screenName;
	screenName = 'main.jpg';

	if (screenName && x === "localhost:3000") {
		$(".footer").after("<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	} // /добавляет подложку для pixel perfect


	function whenResize() {
		var topH = $("header ").innerHeight();

		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	$('.sProducts').each(function () {
		var reviewSlider = new Swiper($(this).find('.sProducts__slider--js'), {
			spaceBetween: 30,
			slidesPerView: 1,
			// grabCursor: true,
			// centeredSlides: true,
			//breakpoints
			breakpoints: {
				//lg
				992: {
					slidesPerView: 3
				},
				768: {
					slidesPerView: 2
				}
			},
			loop: true,
			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 2
			},
			//nav
			navigation: {
				nextEl: $(this).find('.swiper-button-next'),
				prevEl: $(this).find('.swiper-button-prev')
			},
			//pugination
			pagination: {
				el: $(this).find('.swiper-pagination'),
				clickable: true
			}
		}); // rangle sliders for main page
	});
	var reviewSlider = new Swiper('.headerBlock__slider--js', {
		spaceBetween: 30,
		slidesPerView: 1,
		loop: true,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2
		},
		pagination: {
			el: $('.headerBlock').find('.swiper-pagination'),
			clickable: true
		}
	}); // rangle sliders for main page

	var sAdvantages = new Swiper('.sAdvantages__slider--js', {
		spaceBetween: 0,
		slidesPerView: 1,
		loop: true,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2
		},
		//nav
		//pugination
		pagination: {
			el: $('.sAdvantages').find('.swiper-pagination'),
			clickable: true
		}
	}); // rangle sliders for main page

	$(".sCatalog__title").click(function () {
		$(this).next().slideToggle();
		$(this).parent().toggleClass('active');
	});
	$(".has-children > a, .has-children-inner  > a ").after('<div class="before"></div>');
	$(".has-children > .before, .has-children-inner  > .before ").click(function (e) {
		e.preventDefault();
		$(this).next().slideToggle();
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

window.onload = function () {
	document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
		document.body.classList.add('loaded');
		document.body.classList.remove('loaded_hiding');
	}, 500);
};
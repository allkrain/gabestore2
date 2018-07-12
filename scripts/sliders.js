var bestsellersSlider = new Swiper('.js-carousel .carousel__container', {
  speed: 500,
  slidesPerView: 4,
  spaceBetween: 28,
  navigation: {
    disabledClass: 'is-disabled',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    860: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 3,
    },
  },
  on: {
    init: function() {
      var sw = this;
      var slides = sw.slides;
      var activeSlide = sw.activeIndex;
      var totalSlides = sw.slides.length;
      var el = sw.el;
      var parentEl = $(el).closest('.js-carousel');
      var buttonNext = $(parentEl).find('.carousel__button--next');
      var buttonPrev = $(parentEl).find('.carousel__button--prev');
      var counterCurrent = $(parentEl).find('.slider-counter__current');
      var counterTotal = $(parentEl).find('.slider-counter__total');
      var params = sw.params;
      params.navigation.nextEl = buttonNext;
      params.navigation.prevEl = buttonPrev;
      $(counterCurrent).text(activeSlide + 1);
      $(counterTotal).text(totalSlides);
      sw.update();
    },
    slideChange: function() {
      var sw = this;
      var slides = sw.slides;
      var activeSlide = sw.activeIndex;
      var totalSlides = sw.slides.length;
      var el = sw.el;
      var parentEl = $(el).closest('.js-carousel');
      var counterCurrent = $(parentEl).find('.slider-counter__current');
      var counterTotal = $(parentEl).find('.slider-counter__total');
      $(counterCurrent).text(activeSlide + 1);
      $(counterTotal).text(totalSlides);
      if (sw.progress === 1) {
        $(counterCurrent).text(totalSlides);
      } else {
        $(counterCurrent).text(activeSlide + 1);
      }
    },
  },
});

var priceReductionSlider = new Swiper('.js-carousel2 .carousel__container', {
  speed: 500,
  slidesPerView: 5,
  spaceBetween: 20,
  navigation: {
    disabledClass: 'is-disabled',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    860: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 4,
    },
  },
  on: {
    init: function() {
      var sw = this;
      var slides = sw.slides;
      var activeSlide = sw.activeIndex;
      var totalSlides = sw.slides.length;
      var el = sw.el;
      var parentEl = $(el).closest('.js-carousel2');
      var buttonNext = $(parentEl).find('.carousel__button--next');
      var buttonPrev = $(parentEl).find('.carousel__button--prev');
      var counterCurrent = $(parentEl).find('.slider-counter__current');
      var counterTotal = $(parentEl).find('.slider-counter__total');
      var params = sw.params;
      params.navigation.nextEl = buttonNext;
      params.navigation.prevEl = buttonPrev;
      $(counterCurrent).text(activeSlide + 1);
      $(counterTotal).text(totalSlides);
      sw.update();
    },
    slideChange: function() {
      var sw = this;
      var slides = sw.slides;
      var activeSlide = sw.activeIndex;
      var totalSlides = sw.slides.length;
      var el = sw.el;
      var parentEl = $(el).closest('.js-carousel2');
      var counterCurrent = $(parentEl).find('.slider-counter__current');
      var counterTotal = $(parentEl).find('.slider-counter__total');
      $(counterCurrent).text(activeSlide + 1);
      $(counterTotal).text(totalSlides);
      if (sw.progress === 1) {
        $(counterCurrent).text(totalSlides);
      } else {
        $(counterCurrent).text(activeSlide + 1);
      }
    },
  },
});

function HideAndShowDiscountGroups () {
  var groups = $('.discount-groups');
  $(groups).each(function (i, el) {
    var wW = $(window).width();
    var elements = $(el).find('.grid__col');
    var btn = $(el).find('.js-discount-showmore');
    $(elements).addClass('is-hide');
    if (wW < 481) {
      $(elements).each(function (ix, col) {
        if (ix < 3) {
          $(col).removeClass('is-hide');
        }
      });
      $(btn).fadeIn();
    } else if (wW >=481 && wW < 861) {
      $(elements).each(function (ix, col) {
        if (ix < 6) {
          $(col).removeClass('is-hide');
        }
      });
      $(btn).fadeIn();
    } else if (wW >= 861 && wW < 1169) {
      $(elements).each(function (ix, col) {
        if (ix < 8) {
          $(col).removeClass('is-hide');
        }
      });
      $(btn).fadeIn();
    } else {
      $(elements).removeClass('is-hide');
      $(btn).fadeOut();
    }
  });
}

HideAndShowDiscountGroups();

$(window).on('resize', HideAndShowDiscountGroups);

$(document).on('click', '.js-discount-showmore', function (evt) {
  evt.preventDefault();
  var self = this;
  var group = $(self).closest('.discount-groups');
  var hiddenElements = $(group).find('.grid__col.is-hide');
  var wW = $(window).width();
  if ($(hiddenElements).length > 0) {
    if (wW < 861) {
      $(hiddenElements).each(function (i, el) {
        if (i < 3) {
          $(el).fadeIn();
          $(el).removeClass('is-hide');
          $(el).css({ display: ''});
        }
      });

      if ($(hiddenElements).length <= 4) {
        $(self).fadeOut();
      } else {
        $(self).fadeIn();
      }
    } else {
      $(hiddenElements).each(function (i, el) {
        if (i < 4) {
          $(el).fadeIn();
          $(el).removeClass('is-hide');
          $(el).css({ display: ''});
        }
      });

      if ($(hiddenElements).length <= 5) {
        $(self).fadeOut();
      } else {
        $(self).fadeIn();
      }
    }
  }
});

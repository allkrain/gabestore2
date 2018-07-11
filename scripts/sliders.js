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

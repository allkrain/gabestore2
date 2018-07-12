$(document).ready(function(){

  $('.js-filter-range').each(function () {
    var min = parseInt($(this).attr('data-min'));
    var max = parseInt($(this).attr('data-max'));
    var unit = $(this).attr('data-unit');
    noUiSlider.create(this, {
      start: [min, max],
      connect: true,
      range: {
        'min': min,
        'max': max
      },
      step: 1,
    });
    var minInput = $(this).siblings().find('[data-range-min]');
    var maxInput = $(this).siblings().find('[data-range-max]');
    this.noUiSlider.on('update', function( values, handle ) {
      minInput.val(parseInt(values[0]) + unit).change();
      maxInput.val(parseInt(values[1]) + unit).change();
    });
  });

  $('.scrollbar-inner').scrollbar();

  $(document).on('click', '.catalog-filter__title', function () {
    var filterBlock = $(this).parents('.catalog-filter__block');
    var filterBody = $(this).next('.catalog-filter__body');
    filterBlock.toggleClass('is-active');
    if (filterBlock.hasClass('is-active')) {
      filterBody.each(function () {
        var scrollHeight = this.scrollHeight;
        $(this).height(scrollHeight);
      });
    } else {
      filterBody.height(0);
      $('.catalog-filter__found').removeClass('is-active');
    }
    if ($(window).width() > 1020) {
      setTimeout(function(){
        $('html, body').trigger('scroll');
      }, 100);
    }
  });

  $(document).on('click', '.catalog-form .sorting__switcher', function (e) {
    e.preventDefault();
    var main = $(this).parents('.catalog-list').find('.catalog-main');
    var filter = $(this).parents('.catalog-list').find('.catalog-filter-wrapper');
    $(this).siblings('.sorting__switcher').removeClass('is-active');
    $(this).addClass('is-active');
    var text = $(this).attr('data-text');
    var filters = $(this).attr('data-filter');
    $(this).siblings('.link').text(text);
    if (filters === 'yes') {
      main.addClass('is-active');
      filter.addClass('is-active');
    } else {
      main.removeClass('is-active');
      filter.removeClass('is-active');
    }
  });

  $(document).on('click', '.catalog-form .sorting__filter .link', function (e) {
    e.preventDefault();
    $(this).siblings('.sorting__switcher:not(.is-active)').click();
  });

  $(document).on('change', '.catalog-filter input', function (){

    if ($(this).parents('.catalog-filter').attr('data-reset')) {
      $('.catalog-filter__found').removeClass('is-active');
    } else {
      var targetOffset = $(this).offset().top;
      var filterOffset = $(this).parents('.catalog-filter').offset().top;
      var diff = targetOffset - filterOffset;
      $('.catalog-filter__found').addClass('is-active').css('top', diff+'px');
      setTimeout(function(){
        $('.catalog-filter__found').removeClass('is-active');
      }, 3000);
    }

    var checkedLength = $(this).parents('.catalog-filter__block').find('input:checked').length;
    var count = $(this).parents('.catalog-filter__block').find('.catalog-filter__count');
    count.text(checkedLength);
    if (checkedLength !== 0) {
      count.addClass('is-active');
    } else {
      count.removeClass('is-active');
    }

    var filterBlock = $('.catalog-filter__block');
    var totalCount = 0;
    filterBlock.each(function (){
      if ($(this).find('.catalog-filter__count.is-active').length) {
        var currCount = $(this).find('.catalog-filter__count.is-active').text();
        currCount = parseInt(currCount);
        totalCount += currCount;
      }
    });
    if (totalCount > 0) {
      $('.catalog-filter__clearcount').text(totalCount);
      $('.catalog-mob-buttoncount').text(totalCount);
      $('.catalog-filter__clearcount').addClass('is-active');
      $('.catalog-mob-buttoncount').addClass('is-active');
      $('.catalog-mob-button_reset').addClass('is-active');
      $('.catalog-filter').attr('data-checked', 'true');
    } else {
      $('.catalog-filter__clearcount').removeClass('is-active');
      $('.catalog-mob-buttoncount').removeClass('is-active');
      $('.catalog-mob-button_reset').removeClass('is-active');
      $('.catalog-filter').removeAttr('data-checked');
    }

    $('.catalog-collections').remove();
  });

  $(document).on('input', '.catalog-filter__inputbox input', function (){
    if ($(this).val() !== '') {
      $(this).parent().addClass('is-active');
    } else {
      $(this).parent().removeClass('is-active');
    }
  });

  $(document).on('click', '.catalog-filter__inputclear', function (){
    $(this).prev().val('').change();
    $(this).parent().removeClass('is-active');
  });

  $(document).on('click', '.catalog-filter__reset, .catalog-mob-button_reset', function (e){
    e.preventDefault();
    $(this).parents('.catalog-filter').attr('data-reset', 'true');
    $('.catalog-filter input').prop('checked', false).change();
    $(this).parents('.catalog-filter').removeAttr('data-reset');
  });

  $(document).on('click', '.catalog-mob-button_filters', function() {
    $('.catalog-filter-wrapper').addClass('is-active');
    $('html, body').css('overflow', 'hidden');
  });

  $(document).on('click', '.catalog-filter__close, .catalog-filter__accept', function (e){
    e.preventDefault();
    e.stopPropagation();
    $('.catalog-filter-wrapper').removeClass('is-active');
    $('html, body').css('overflow', '');
  });

  !function(i){i.fn.theiaStickySidebar=function(t){function e(t,e){var a=o(t,e);a||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),i(document).on("scroll."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)),i(window).on("resize."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)))}function o(t,e){return t.initialized===!0||!(i("body").width()<t.minWidth)&&(a(t,e),!0)}function a(t,e){t.initialized=!0;var o=i("#theia-sticky-sidebar-stylesheet-"+t.namespace);0===o.length&&i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-'+t.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),e.each(function(){function e(){a.fixedScrollTop=0,a.sidebar.css({"min-height":"1px"}),a.stickySidebar.css({position:"static",width:"",transform:"none"})}function o(t){var e=t.height();return t.children().each(function(){e=Math.max(e,i(this).height())}),e}var a={};if(a.sidebar=i(this),a.options=t||{},a.container=i(a.options.containerSelector),0==a.container.length&&(a.container=a.sidebar.parent()),a.sidebar.parents().css("-webkit-transform","none"),a.sidebar.css({position:a.options.defaultPosition,overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),a.stickySidebar=a.sidebar.find(".theiaStickySidebar"),0==a.stickySidebar.length){var s=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;a.sidebar.find("script").filter(function(i,t){return 0===t.type.length||t.type.match(s)}).remove(),a.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()),a.sidebar.append(a.stickySidebar)}a.marginBottom=parseInt(a.sidebar.css("margin-bottom")),a.paddingTop=parseInt(a.sidebar.css("padding-top")),a.paddingBottom=parseInt(a.sidebar.css("padding-bottom"));var r=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight();a.stickySidebar.css("padding-top",1),a.stickySidebar.css("padding-bottom",1),r-=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight()-d-r,0==r?(a.stickySidebar.css("padding-top",0),a.stickySidebarPaddingTop=0):a.stickySidebarPaddingTop=1,0==d?(a.stickySidebar.css("padding-bottom",0),a.stickySidebarPaddingBottom=0):a.stickySidebarPaddingBottom=1,a.previousScrollTop=null,a.fixedScrollTop=0,e(),a.onScroll=function(a){if(a.stickySidebar.is(":visible")){if(i("body").width()<a.options.minWidth)return void e();if(a.options.disableOnResponsiveLayouts){var s=a.sidebar.outerWidth("none"==a.sidebar.css("float"));if(s+50>a.container.width())return void e()}var r=i(document).scrollTop(),d="static";if(r>=a.sidebar.offset().top+(a.paddingTop-a.options.additionalMarginTop)){var c,p=a.paddingTop+t.additionalMarginTop,b=a.paddingBottom+a.marginBottom+t.additionalMarginBottom,l=a.sidebar.offset().top,f=a.sidebar.offset().top+o(a.container),h=0+t.additionalMarginTop,g=a.stickySidebar.outerHeight()+p+b<i(window).height();c=g?h+a.stickySidebar.outerHeight():i(window).height()-a.marginBottom-a.paddingBottom-t.additionalMarginBottom;var u=l-r+a.paddingTop,S=f-r-a.paddingBottom-a.marginBottom,y=a.stickySidebar.offset().top-r,m=a.previousScrollTop-r;"fixed"==a.stickySidebar.css("position")&&"modern"==a.options.sidebarBehavior&&(y+=m),"stick-to-top"==a.options.sidebarBehavior&&(y=t.additionalMarginTop),"stick-to-bottom"==a.options.sidebarBehavior&&(y=c-a.stickySidebar.outerHeight()),y=m>0?Math.min(y,h):Math.max(y,c-a.stickySidebar.outerHeight()),y=Math.max(y,u),y=Math.min(y,S-a.stickySidebar.outerHeight());var k=a.container.height()==a.stickySidebar.outerHeight();d=(k||y!=h)&&(k||y!=c-a.stickySidebar.outerHeight())?r+y-a.sidebar.offset().top-a.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==d){var v=i(document).scrollLeft();a.stickySidebar.css({position:"fixed",width:n(a.stickySidebar)+"px",transform:"translateY("+y+"px)",left:a.sidebar.offset().left+parseInt(a.sidebar.css("padding-left"))-v+"px",top:"0px"})}else if("absolute"==d){var x={};"absolute"!=a.stickySidebar.css("position")&&(x.position="absolute",x.transform="translateY("+(r+y-a.sidebar.offset().top-a.stickySidebarPaddingTop-a.stickySidebarPaddingBottom)+"px)",x.top="0px"),x.width=n(a.stickySidebar)+"px",x.left="",a.stickySidebar.css(x)}else"static"==d&&e();"static"!=d&&1==a.options.updateSidebarHeight&&a.sidebar.css({"min-height":a.stickySidebar.outerHeight()+a.stickySidebar.offset().top-a.sidebar.offset().top+a.paddingBottom}),a.previousScrollTop=r}},a.onScroll(a),i(document).on("scroll."+a.options.namespace,function(i){return function(){i.onScroll(i)}}(a)),i(window).on("resize."+a.options.namespace,function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(a)),"undefined"!=typeof ResizeSensor&&new ResizeSensor(a.stickySidebar[0],function(i){return function(){i.onScroll(i)}}(a))})}function n(i){var t;try{t=i[0].getBoundingClientRect().width}catch(i){}return"undefined"==typeof t&&(t=i.width()),t}var s={containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern",defaultPosition:"relative",namespace:"TSS"};return t=i.extend(s,t),t.additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,e(t,this),this}}(jQuery);

  $('.catalog-main').theiaStickySidebar({});
  $('.catalog-filter-wrapper').theiaStickySidebar({});

  if ($(window).width() <= 1020) {
    $('.catalog-filter-wrapper').removeAttr('style');
  } else {
    $('.catalog-form .sorting__switcher[data-filter="yes"]').click();
  }

  window.desktop;
  window.newdesktop;

  function checkpagewidth() {
    if ($(window).width() > 1020) {
      desktop = true;
    } else {
      desktop = false;
    }

    $(window).resize(function(){
      if ($(window).width() > 1020) {
        newdesktop = true;
      } else {
        newdesktop = false;
      }

      if (newdesktop != desktop) {
        desktop = !desktop;
        if (newdesktop === false) { // с десктопа на мобилку
          $('.catalog-filter-wrapper').removeAttr('style').removeClass('is-active');
        } else { // с мобилки на десктоп
          $('html, body').css('overflow', '');
          if ($('.catalog-filter').attr('data-checked')) {
            $('.catalog-form .sorting__switcher[data-filter="yes"]').click();
          } else {
            $('.catalog-form .sorting__switcher[data-filter="no"]').click();
          }
        }
      }
    });
  }

  checkpagewidth();
});

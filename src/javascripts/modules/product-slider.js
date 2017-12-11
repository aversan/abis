import Swiper from 'swiper';

export default class ProductSlider {
  constructor(el) {
    this.el = el;

    $(this.el).each(function () {
      const $wrapper = $(this);
      const type = $wrapper.data('type');
      const $swiperContainer = $wrapper.find('.js-swiper-container');
      const $prev = $wrapper.find('.js-swiper-prev');
      const $next = $wrapper.find('.js-swiper-next');
      const defaultOptions = {
        navigation: {
          prevEl: $prev,
          nextEl: $next,
        },
        slidesPerView: 4,
        spaceBetween: 30,
        slideToClickedSlide: true,
        initialSlide: 0,
        setWrapperSize: true,
        autoHeight: true,
        observer: true,
        observeParents: true,
        // grabCursor: true,
        // freeMode: true,
      };

      const altOptions = {
        navigation: {
          prevEl: $prev,
          nextEl: $next,
        },
        slidesPerView: 3,
        spaceBetween: 90,
        slideToClickedSlide: true,
        initialSlide: 0,
        setWrapperSize: true,
        autoHeight: true,
        observer: true,
        observeParents: true,
        // grabCursor: true,
        // freeMode: true,
      };

      let options;
      switch(type) {
        case 'alt':
          options = altOptions;
          break;
        default:
          options = defaultOptions;
      }

      new Swiper($swiperContainer, options);
    });
  }
}

import Swiper from 'swiper';

export default class Hero {
  constructor(el) {
    this.el = el;

    $(this.el).each(function () {
      const $wrapper = $(this);
      const $swiperContainer = $wrapper.find('.js-swiper-container');
      const $next = $wrapper.find('.js-swiper-next');
      const options = {
        navigation: {
          nextEl: $next,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        initialSlide: 0,
        autoHeight: true,
        observer: true,
        observeParents: true,
        // effect: 'flip',
        loop: true,
      };
      new Swiper($swiperContainer, options);
    });
  }
}

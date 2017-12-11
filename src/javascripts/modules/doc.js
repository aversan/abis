import Swiper from 'swiper';

export default class Doc {
  constructor(el) {
    this.el = el;

    $(this.el).each(function () {
      const $link = $(this);
      $link.on('click', () => {
        const target = $link.data('target');
        const imageUrl = $link.attr('href');
        const $modal = $(target);
        $modal.find('.js-image').attr('src', imageUrl);
      });
    });
  }
}

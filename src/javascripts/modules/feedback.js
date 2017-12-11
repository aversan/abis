import Swiper from 'swiper';

export default class Feedback {
  constructor(el) {
    this.el = el;

    $(this.el).each(function () {
      const $wrapper = $(this);
      const $submit = $wrapper.find('.js-submit');
      const $modal = $wrapper.find('.js-modal');
      const $close = $wrapper.find('.js-close');

      $submit.on('click', () => {
        $modal.addClass('d-block');
      });

      $close.on('click', () => {
        $modal.removeClass('d-block');
      })
    });
  }
}

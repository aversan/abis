export default class Chart {
  constructor(el) {
    this.el = el;

    $(this.el).each(function () {
      const $wrapper = $(this);
      const $pagination = $(this).find('.js-pagination').children();
      const $slides = $(this).find('.js-container').children();

      $pagination.each(function(){
        const page = $(this);
        page.hover(() => {
          const current = $(this);
          const index = $pagination.index(current);
          current.siblings().removeClass('active').end().addClass('active');
          $slides.removeClass('active').eq(index).addClass('active');
        }, () => {});
      })
    });
  }
}

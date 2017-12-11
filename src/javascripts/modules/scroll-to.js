import scrollToElement from 'scroll-to-element';

export default class ScrollTo {
  constructor(el) {
    this.el = el;
    this.el.addEventListener('click', () => {
      event.preventDefault();
      const id = this.el.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      scrollToElement(el, {
          offset: 90,
          ease: 'inOutQuart',
          duration: 1500
        }
      )})
  }
}

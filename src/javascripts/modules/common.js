$(() => {
  // 60fps scrolling using pointer-events: none
  // https://habrahabr.ru/post/204238/
  const { body } = document;
  let timer;
  window.addEventListener('scroll', () => {
    clearTimeout(timer);
    if (!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover');
    }
    timer = setTimeout(() => {
      body.classList.remove('disable-hover');
    }, 500);
  }, false);
});

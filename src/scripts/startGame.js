import createGame from '.';

const start = document.querySelector('.btn-start'),
  screens = document.querySelectorAll('.screen'),
  sizeList = document.querySelector('.size-list'),
  btns = document.querySelectorAll('.btn')

export let GRID_SIZE;

start.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');
});

sizeList.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target && e.target.classList.contains('btn-size')) {
    GRID_SIZE = +e.target.dataset.size;
    screens[1].classList.add('up');
    btns.forEach(btn => { // убираем доступность кнопок с клавиатуры на время игры
      btn.setAttribute('tabindex', -1);
      btn.blur();
    })
    createGame();
  }
});

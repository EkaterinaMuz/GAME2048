import createGame from '.';

const start = document.querySelector('.btn-start'),
  screens = document.querySelectorAll('.screen'),
  sizeList = document.querySelector('.size-list');

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
    createGame();
  }
  return GRID_SIZE;
});

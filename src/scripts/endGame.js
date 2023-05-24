export default function endGame(status) {
  const gameBoard = document.querySelector('.game-board');
  gameBoard.classList.add(status);
  const message = document.createElement('p');
  message.classList.add(`${status}-message`);
  message.innerHTML = `You ${status}!<button class="btn btn-restart">Try again</button>`;
  gameBoard.append(message);
  const restart = document.querySelector('.btn-restart');
  restart.addEventListener('click', () => location.reload());
}

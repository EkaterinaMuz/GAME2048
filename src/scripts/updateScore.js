import endGame from './endGame';

export default function updateScore(cells) {
  const gameScore = document.querySelector('.game__score');
  const score = Math.max.apply(
    null,
    cells
      .flat()
      .filter((cell) => cell.tile != null) // находим непустые клетки
      .reduce((acc, cell) => {
        acc.push(cell?.tile?.value);
        return acc;
      }, []) // сохраняем их значения в массив и находим большее
  );
  gameScore.textContent = score;
  if (score === 2048) {
    endGame('won');
  }
}

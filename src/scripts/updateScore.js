import endGame from './endGame';

export default function updateScore(cells) {
  const gameScore = document.querySelector('.game__score');
  const score = Math.max.apply(
    null,
    cells
      .flat()
      .filter((cell) => cell.tile != null)
      .reduce((acc, cell) => {
        acc.push(cell?.tile?.value);
        return acc;
      }, [])
  );
  gameScore.textContent = score;
  if (score === 1024) {
    endGame('won');
  }
}

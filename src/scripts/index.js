import '../style.css';
import './startGame';
import { GRID_SIZE } from './startGame';
import Grid from './Grid';
import Tile from './Tile';
import slideTiles from './slideTiles';
import endGame from './endGame';

export default function createGame() {
  const gameBoard = document.querySelector('.game-board');
  const grid = new Grid(gameBoard, GRID_SIZE); // создаем игровое поле
  grid.randomEmptyCell().tile = new Tile(gameBoard); // добавляем первых 2 квадрата
  grid.randomEmptyCell().tile = new Tile(gameBoard);
  setUpGame();

  function setUpGame() {
    window.addEventListener('keydown', handlePlay, { once: true });
  }

  async function handlePlay(e) {
    switch (e.key) {
      case 'ArrowUp':
        if (!canMoveUp()) {
          setUpGame();
          return;
        }
        await moveUp();
        break;

      case 'ArrowDown':
        if (!canMoveDown()) {
          setUpGame();
          return;
        }
        await moveDown();
        break;

      case 'ArrowLeft':
        if (!canMoveLeft()) {
          setUpGame();
          return;
        }
        await moveLeft();
        break;

      case 'ArrowRight':
        if (!canMoveRight()) {
          setUpGame();
          return;
        }
        await moveRight();
        break;
      default:
        setUpGame();
        return;
    }
    grid.cells.forEach((cell) => cell.mergeTiles(grid.cells)); // после нажатия на стрелку сохраняем value квадрата
    grid.randomEmptyCell().tile = new Tile(gameBoard); // добавляем новый квадрат

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      endGame('lost'); // если невозможно совершить действие ни в одну сторону - вы проиграли
    }
    setUpGame();
  }

  function moveUp() {
    return slideTiles(grid.ColumnCells);
  }
  function moveDown() {
    return slideTiles(grid.ColumnCells.map((column) => column.reverse()));
  }
  function moveLeft() {
    return slideTiles(grid.RowCells);
  }
  function moveRight() {
    return slideTiles(grid.RowCells.map((row) => row.reverse()));
  }

  slideTiles(grid.cells);

  function canMoveUp() {
    return canMove(grid.ColumnCells);
  }
  function canMoveDown() {
    return canMove(grid.ColumnCells.map((column) => column.reverse()));
  }
  function canMoveLeft() {
    return canMove(grid.RowCells);
  }
  function canMoveRight() {
    return canMove(grid.RowCells.map((row) => row.reverse()));
  }

  function canMove(cells) {
    return cells.some((cellGroup) => {
      return cellGroup.some((cell, index) => { // проходимся по 2-мерному массиву
        if (cell.tile == null) return false; 
        if (index === 0) return false; // если квадарат на 0 индексе - находится на краю борда - движение невозможно
        const moveToCell = cellGroup[index - 1];
        return moveToCell.canAccept(cell.tile);
      });
    });
  }
}

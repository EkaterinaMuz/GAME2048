import '../style.css';
import './startGame';
import { GRID_SIZE } from './startGame';
import Grid from './Grid';
import Tile from './Tile';
import slideTiles from './slideTiles';
import endGame from './endGame';

export default function createGame() {
  const gameBoard = document.querySelector('.game-board');
  const grid = new Grid(gameBoard, GRID_SIZE);
  grid.randomEmptyCell().tile = new Tile(gameBoard);
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
    grid.cells.forEach((cell) => cell.mergeTiles(grid.cells));
    grid.randomEmptyCell().tile = new Tile(gameBoard);

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      endGame('lost');
    }
    setUpGame();
  }

  function moveUp() {
    return slideTiles(grid.ColumnCells);
  }
  function moveDown() {
    return slideTiles(grid.ColumnCells.map((column) => [...column].reverse()));
  }
  function moveLeft() {
    console.log('left');
    return slideTiles(grid.RowCells);
  }
  function moveRight() {
    console.log('right');
    return slideTiles(grid.RowCells.map((row) => [...row].reverse()));
  }

  slideTiles(grid.cells);

  function canMoveUp() {
    return canMove(grid.ColumnCells);
  }
  function canMoveDown() {
    return canMove(grid.ColumnCells.map((column) => [...column].reverse()));
  }
  function canMoveLeft() {
    return canMove(grid.RowCells);
  }
  function canMoveRight() {
    return canMove(grid.RowCells.map((row) => [...row].reverse()));
  }

  function canMove(cells) {
    return cells.some((cellGroup) => {
      return cellGroup.some((cell, index) => {
        if (cell.tile == null) return false;
        if (index === 0) return false;
        const moveToCell = cellGroup[index - 1];
        return moveToCell.canAccept(cell.tile);
      });
    });
  }
}

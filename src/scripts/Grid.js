import updateScore from './updateScore';

const GRID_CELLS = 15;
const GRID_GAP = 2;

export default class Grid {
  constructor(gridElement, GRID_SIZE) {
    gridElement.style.setProperty('--grid-size', GRID_SIZE);
    gridElement.style.setProperty('--grid-cells', `${GRID_CELLS}vmin`);
    gridElement.style.setProperty('--grid-gap', `${GRID_GAP}vmin`);
    this.cells = createCellElement(gridElement, GRID_SIZE).map((cellElement, index) => {
      return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE, this.cells));
    });
  }

  get ColumnCells() {
    return this.cells.reduce((acc, cell) => {
      acc[cell.x] = acc[cell.x] || [];
      acc[cell.x][cell.y] = cell;
      return acc;
    }, []);
  }

  get RowCells() {
    return this.cells.reduce((acc, cell) => {
      acc[cell.y] = acc[cell.y] || [];
      acc[cell.y][cell.x] = cell;
      return acc;
    }, []);
  }

  get emptyCells() {
    return this.cells.filter((cell) => cell.tile == null);
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.emptyCells.length);
    return this.emptyCells[randomIndex];
  }
}

export class Cell {
  #x;
  #y;
  #tile;
  #mergeTile;
  constructor(cellElement, x, y, cells) {
    this.cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  set tile(value) {
    this.#tile = value;
    if (value === null) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }

  get mergeTile() {
    return this.#mergeTile;
  }

  set mergeTile(value) {
    this.#mergeTile = value;
    if (value === null) return;
    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  canAccept(tile) {
    return this.tile == null || (this.mergeTile == null && this.tile.value === tile.value);
  }

  mergeTiles(cells) {
    if (this.tile == null || this.mergeTile == null) return;
    this.#tile.value += this.#mergeTile.value;
    updateScore(cells);
    this.#mergeTile.remove();
    this.#mergeTile = null;
  }
}

function createCellElement(gridElement, GRID_SIZE) {
  const cells = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cells.push(cell);
    gridElement.append(cell);
  }
  return cells;
}

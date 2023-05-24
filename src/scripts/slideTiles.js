export default function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((cellGroup) => {
      const promises = [];
      for (let i = 1; i < cellGroup.length; i++) {
        let currentCell = cellGroup[i];
        if (currentCell.tile == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = cellGroup[j];
          if (!moveToCell.canAccept(currentCell.tile)) break;
          lastValidCell = moveToCell;

          if (lastValidCell != null) {
            promises.push(currentCell.tile.waitForTransition());
            if (lastValidCell.tile != null) {
              lastValidCell.mergeTile = currentCell.tile;
            } else {
              lastValidCell.tile = currentCell.tile;
            }
            currentCell.tile = null;
            currentCell = lastValidCell;
          }
        }
      }
      return promises;
    })
  );
}

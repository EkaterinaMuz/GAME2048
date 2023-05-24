export default function slideTiles(cells) {
  return Promise.all( // асинхронный код даст возможность сначала закончить анимацию смещения квадартов, а после - их слиния
    cells.flatMap((cellGroup) => {
      const promises = [];
      for (let i = 1; i < cellGroup.length; i++) {
        let currentCell = cellGroup[i];
        if (currentCell.tile == null) continue; //если сдвигаемая клетка пустая - пропускаем
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = cellGroup[j];
          if (!moveToCell.canAccept(currentCell.tile)) break;
          lastValidCell = moveToCell;

          if (lastValidCell != null) {
            promises.push(currentCell.tile.waitForTransition());
            if (lastValidCell.tile != null) { // если клетка, на которую двигаем непустая - сохраняем значение смещаемого квадрата
              lastValidCell.mergeTile = currentCell.tile;
            } else {
              lastValidCell.tile = currentCell.tile; // если клетка пустая - смещаем на ее квадрат
            }
            currentCell.tile = null; // удаляем смещаемый квадрат с прошлого места
            currentCell = lastValidCell;
          }
        }
      }
      return promises;
    })
  );
}

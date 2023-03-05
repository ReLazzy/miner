import { SIZE } from "../constants";
import { Cell, CellState, CellValue } from "../types";

export const checkWin = (
  newCells: Cell[][],
  setIsWon: React.Dispatch<React.SetStateAction<boolean>>
): Cell[][] => {
  //проверяем остались ли пустые клетки
  let safeOpenCellsExists = false;
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const currentCell = newCells[row][col];
      if (
        currentCell.value !== CellValue.bomb &&
        currentCell.state === CellState.closed
      ) {
        console.log("первая ошибка");

        safeOpenCellsExists = true;
        break;
      }
    }
  }

  if (!safeOpenCellsExists) {
    newCells = newCells.map((row) =>
      row.map((cell) => {
        if (cell.state === CellState.flag && !(cell.value === CellValue.bomb)) {
          return {
            ...cell,
            state: CellState.closed,
          };
        }
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.flag,
          };
        }
        return cell;
      })
    );
    setIsWon(true);
  }
  return newCells;
};

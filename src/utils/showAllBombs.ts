import { Cell, CellState, CellValue } from "../types";

export const showAllBombs = (
  yDetected: number,
  xDetected: number,
  cells: Cell[][]
): Cell[][] => {
  cells.map((row, yIndex) =>
    row.map((cell, xIndex) => {
      if (xIndex === xDetected && yIndex === yDetected)
        cell.value = CellValue.detected;
      if (cell.state === CellState.flag && cell.value === CellValue.bomb)
        cell.value = CellValue.defused;
      if (
        cell.value === CellValue.bomb ||
        cell.value === CellValue.defused ||
        cell.value === CellValue.detected
      )
        cell.state = CellState.visible;
    })
  );
  return cells;
};

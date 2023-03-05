import { Cell, CellValue } from "../types/CellTypes";
import { createFieldCells } from "./createFieldCells";

export const startField = (
  newCells: Cell[][],
  yParam: number,
  xParam: number
): Cell[][] => {
  let isABomb = newCells[yParam][xParam].value === CellValue.bomb;

  while (isABomb) {
    newCells = createFieldCells();
    if (newCells[yParam][xParam].value !== CellValue.bomb) {
      isABomb = false;
      break;
    }
  }
  return newCells;
};

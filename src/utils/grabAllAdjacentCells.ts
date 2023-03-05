import { SIZE } from "../constants";
import { AdjacentCellsI, Cell } from "../types";

export const grabAllAdjacentCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number
): AdjacentCellsI => {
  const topLeftCell =
    rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  const topRightCell =
    rowParam > 0 && colParam < SIZE - 1
      ? cells[rowParam - 1][colParam + 1]
      : null;
  const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
  const rightCell = colParam < SIZE - 1 ? cells[rowParam][colParam + 1] : null;
  const bottomLeftCell =
    rowParam < SIZE - 1 && colParam > 0
      ? cells[rowParam + 1][colParam - 1]
      : null;
  const bottomCell = rowParam < SIZE - 1 ? cells[rowParam + 1][colParam] : null;
  const bottomRightCell =
    rowParam < SIZE - 1 && colParam < SIZE - 1
      ? cells[rowParam + 1][colParam + 1]
      : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};

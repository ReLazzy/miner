import { Cell, CellState, CellValue } from "../types";
import { grabAllAdjacentCells } from "./grabAllAdjacentCells";

export const openAllAdjacentNullCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number
) => {
  console.log("заходим");
  const currentCell = cells[rowParam][colParam];
  if (
    currentCell.state === CellState.flag ||
    currentCell.state === CellState.question
  ) {
    return cells;
  }

  let newCells = cells.slice();
  newCells[rowParam][colParam].state = CellState.visible;

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = grabAllAdjacentCells(cells, rowParam, colParam);

  if (
    topLeftCell?.state === CellState.closed &&
    topLeftCell.value !== CellValue.bomb
  ) {
    if (topLeftCell.value === CellValue.none) {
      newCells = openAllAdjacentNullCells(newCells, rowParam - 1, colParam - 1);
    } else {
      newCells[rowParam - 1][colParam - 1].state = CellState.visible;
    }
  }

  if (topCell?.state === CellState.closed && topCell.value !== CellValue.bomb) {
    if (topCell.value === CellValue.none) {
      newCells = openAllAdjacentNullCells(newCells, rowParam - 1, colParam);
    } else {
      newCells[rowParam - 1][colParam].state = CellState.visible;
    }
  }

  if (
    topRightCell?.state === CellState.closed &&
    topRightCell.value !== CellValue.bomb
  ) {
    if (topRightCell.value === CellValue.none) {
      newCells = openAllAdjacentNullCells(newCells, rowParam - 1, colParam + 1);
    } else {
      newCells[rowParam - 1][colParam + 1].state = CellState.visible;
    }
  }

  if (
    leftCell?.state === CellState.closed &&
    leftCell.value !== CellValue.bomb
  ) {
    if (leftCell.value === CellValue.none) {
      newCells = openAllAdjacentNullCells(newCells, rowParam, colParam - 1);
    } else {
      newCells[rowParam][colParam - 1].state = CellState.visible;
    }
  }

  if (
    rightCell?.state === CellState.closed &&
    rightCell.value !== CellValue.bomb
  ) {
    if (rightCell.value === CellValue.none) {
      newCells = openAllAdjacentNullCells(newCells, rowParam, colParam + 1);
    } else {
      newCells[rowParam][colParam + 1].state = CellState.visible;
    }
  }

  if (
    bottomLeftCell?.state === CellState.closed &&
    bottomLeftCell.value !== CellValue.bomb
  ) {
    if (bottomLeftCell.value === CellValue.none) {
      newCells = openAllAdjacentNullCells(newCells, rowParam + 1, colParam - 1);
    } else {
      newCells[rowParam + 1][colParam - 1].state = CellState.visible;
    }
  }

  if (
    bottomCell?.state === CellState.closed &&
    bottomCell.value !== CellValue.bomb
  ) {
    if (bottomCell.value === CellValue.none) {
      newCells = openAllAdjacentNullCells(newCells, rowParam + 1, colParam);
    } else {
      newCells[rowParam + 1][colParam].state = CellState.visible;
    }
  }

  if (
    bottomRightCell?.state === CellState.closed &&
    bottomRightCell.value !== CellValue.bomb
  ) {
    if (bottomRightCell.value === CellValue.none) {
      newCells = openAllAdjacentNullCells(newCells, rowParam + 1, colParam + 1);
    } else {
      newCells[rowParam + 1][colParam + 1].state = CellState.visible;
    }
  }

  return newCells;
};

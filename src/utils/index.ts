import { BOMB_COUNT, SIZE } from "../constants";
import { Cell, CellState, CellValue } from "../types";

const grabAllAdjacentCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number
): {
  topLeftCell: Cell | null;
  topCell: Cell | null;
  topRightCell: Cell | null;
  leftCell: Cell | null;
  rightCell: Cell | null;
  bottomLeftCell: Cell | null;
  bottomCell: Cell | null;
  bottomRightCell: Cell | null;
} => {
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

export const createFieldCells = (): Cell[][] => {
  const cells: Cell[][] = [];
  //создаем поле из обьектов типа Cell
  for (let y = 0; y < SIZE; y++) {
    cells.push([]);
    for (let x = 0; x < SIZE; x++) {
      cells[y].push({
        value: CellValue.none,
        state: CellState.closed,
      });
    }
  }
  //Задаем значение  CellValey.bomb(бомба) рандомным клеткам

  for (let i = 0; i < BOMB_COUNT; ) {
    const x = Math.floor(Math.random() * SIZE);
    const y = Math.floor(Math.random() * SIZE);

    const curentCell = cells[y][x];

    if (curentCell.value === CellValue.bomb) continue;

    cells[y][x] = { ...cells[y][x], value: CellValue.bomb };

    i++;
  }
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++) {
      if (cells[y][x].value === CellValue.bomb) {
        const {
          topLeftCell,
          topCell,
          topRightCell,
          leftCell,
          rightCell,
          bottomLeftCell,
          bottomCell,
          bottomRightCell,
        } = grabAllAdjacentCells(cells, y, x);

        //увеличиваем значение соседних клеток на 1
        if (topLeftCell && topLeftCell?.value !== CellValue.bomb) {
          topLeftCell.value += 1;
        }
        if (topCell && topCell?.value !== CellValue.bomb) {
          topCell.value++;
        }

        if (topRightCell && topRightCell?.value !== CellValue.bomb) {
          topRightCell.value++;
        }
        if (leftCell && leftCell?.value !== CellValue.bomb) {
          leftCell.value++;
        }
        if (rightCell && rightCell?.value !== CellValue.bomb) {
          rightCell.value++;
        }
        if (bottomLeftCell && bottomLeftCell?.value !== CellValue.bomb) {
          bottomLeftCell.value++;
        }
        if (bottomCell && bottomCell?.value !== CellValue.bomb) {
          bottomCell.value++;
        }
        if (bottomRightCell && bottomRightCell?.value !== CellValue.bomb) {
          bottomRightCell.value++;
        }
      }
    }

  return cells;
};

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

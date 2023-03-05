import { BOMB_COUNT, SIZE } from "../constants";
import { Cell, CellState, CellValue } from "../types";
import { grabAllAdjacentCells } from "./grabAllAdjacentCells";

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

import React from "react";
import { Cell, CellState, CellValue } from "../types/CellTypes";
import { Face } from "../types/FaceTypes";

import { checkWin } from "../utils/checkWin";
import { openAllAdjacentNullCells } from "../utils/openAllAdjacentNullCells";
import { showAllBombs } from "../utils/showAllBombs";
import { startField } from "../utils/startField";
import Button from "./Button";
import cs from "./CellsField.module.css";

interface CellsFieldI {
  cells: Cell[][];
  setCells: React.Dispatch<React.SetStateAction<Cell[][]>>;
  bombFlags: number;
  isLost: boolean;
  isWon: boolean;
  isLive: boolean;
  setBombFlags: React.Dispatch<React.SetStateAction<number>>;
  setFace: React.Dispatch<React.SetStateAction<Face>>;
  setIsLive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWon: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLost: React.Dispatch<React.SetStateAction<boolean>>;
}

const CellsField: React.FC<CellsFieldI> = ({
  cells,
  setCells,
  bombFlags,
  isLive,
  isLost,
  isWon,
  setBombFlags,
  setFace,
  setIsLive,
  setIsLost,
  setIsWon,
}) => {
  // обработчики для зажатой лкм
  const handleCellMouseDown =
    (yParam: number, xParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      if (
        e.button === 0 &&
        cells[yParam][xParam].state === CellState.closed &&
        !(isWon || isLost)
      ) {
        cells[yParam][xParam].state = CellState.pressed;
        setFace(Face.fear);
      }
    };
  const handleCellMouseUp =
    (yParam: number, xParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      if (
        e.button === 0 &&
        cells[yParam][xParam].state === CellState.pressed &&
        !(isWon || isLost)
      ) {
        cells[yParam][xParam].state = CellState.closed;
        setFace(Face.smile);
      }
    };

  //обработчик для клика лкм по клетке
  const handleCellClick = (yParam: number, xParam: number) => (): void => {
    let newCells = cells.slice();

    if (
      newCells[yParam][xParam].state === CellState.flag ||
      newCells[yParam][xParam].state === CellState.visible ||
      newCells[yParam][xParam].state === CellState.question ||
      isWon ||
      isLost
    ) {
      return;
    }

    //  меняем поле пока в нужной клетке не будет бомбы
    if (!isLive) {
      newCells = startField(newCells, yParam, xParam);
      setIsLive(true);
    }

    const currentCell = newCells[yParam][xParam];

    if (currentCell.value === CellValue.bomb) {
      newCells = showAllBombs(yParam, xParam, newCells);
      setIsLost(true);
      setCells(newCells);
      return;
    }
    currentCell.state = CellState.visible;

    if (currentCell.value === CellValue.none)
      newCells = openAllAdjacentNullCells(newCells, yParam, xParam);

    //проверяем остались ли пустые клетки
    newCells = checkWin(newCells, setIsWon);

    setCells(newCells);
  };
  //обработчик для клика пкм по клетке
  const handleCellContext =
    (yParam: number, xParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      const currentCells = cells.slice();
      const currentCell = cells[yParam][xParam];

      if (
        currentCell.state === CellState.visible ||
        isWon ||
        isLost ||
        !isLive
      ) {
        return;
      } else if (currentCell.state === CellState.closed && bombFlags !== 0) {
        currentCells[yParam][xParam].state = CellState.flag;
        setBombFlags(bombFlags - 1);
      } else if (currentCell.state === CellState.flag) {
        currentCells[yParam][xParam].state = CellState.question;
        setBombFlags(bombFlags + 1);
      } else if (currentCell.state === CellState.question) {
        currentCells[yParam][xParam].state = CellState.closed;
      }

      setCells(currentCells);
    };
  return (
    <div className={cs.container}>
      {cells.map((row, y) => (
        <div key={y} className={cs.cellsRow}>
          {row.map((cell, x) => (
            <Button
              onContext={handleCellContext}
              onMouseDown={handleCellMouseDown}
              onMouseUp={handleCellMouseUp}
              onMouseOut={handleCellMouseUp}
              onClick={handleCellClick}
              key={`${y}-${x}`}
              x={x}
              y={y}
              value={cell.value}
              state={cell.state}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CellsField;

import React, { useState, useEffect } from "react";

import "./App.css";
import Button from "./components/Button";
import { BOMB_COUNT, SIZE } from "./constants";
import { Face, CellState, CellValue, Cell } from "./types";
import { createFieldCells, openAllAdjacentNullCells } from "./utils";

function App() {
  const [cells, setCells] = useState<Cell[][]>(createFieldCells());
  const [timeCount, setTimeCount] = useState<number>(0);
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number[]>([0, 0, 0]);
  const [bombFlags, setBombFlags] = useState<number>(BOMB_COUNT);
  const [bombCount, setBombCount] = useState<number[]>([0, 0, 0]);
  const [isLost, setIsLost] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(false);

  const showAllBombs = (yDetected: number, xDetected: number): void => {
    cells.map((row, yIndex) =>
      row.map((cell, xIndex) => {
        if (xIndex === xDetected && yIndex === yDetected)
          cell.value = CellValue.detected;
        if (cell.state === CellState.flag && cell.value === CellValue.bomb)
          cell.value = CellValue.defused;
        if (cell.value === CellValue.bomb || cell.value === CellValue.defused)
          cell.state = CellState.visible;
      })
    );
  };

  const handleCellMouseDown =
    (yParam: number, xParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      if (
        e.button === 0 &&
        cells[yParam][xParam].state === CellState.closed &&
        !(isWon || isLost)
      ) {
        cells[yParam][xParam].state = CellState.pressed;
        console.log("pressed", cells[yParam][xParam].state);
        setFace(Face.fear);
        //setCells([...cells]);
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
        console.log("clossed", cells[yParam][xParam].state);
        setFace(Face.smile);
      }
    };

  const handleFaceClick = (): void => {
    setIsLive(false);
    setFace(Face.smile);
    setTimeCount(0);
    setCells(createFieldCells());
    setBombFlags(BOMB_COUNT);
    setIsLost(false);
    setIsWon(false);
  };

  const handleCellClick =
    (yParam: number, xParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
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
      if (!isLive) {
        let isABomb = newCells[yParam][xParam].value === CellValue.bomb;
        while (isABomb) {
          newCells = createFieldCells();
          if (newCells[yParam][xParam].value !== CellValue.bomb) {
            isABomb = false;
            break;
          }
        }
        setIsLive(true);
      }

      if (newCells[yParam][xParam].value === CellValue.bomb) {
        showAllBombs(yParam, xParam);
        setIsLost(true);
      }
      newCells[yParam][xParam].state = CellState.visible;

      if (newCells[yParam][xParam].value === CellValue.none)
        newCells = openAllAdjacentNullCells(newCells, yParam, xParam);
      console.log("visible", cells[yParam][xParam].state);

      let safeOpenCellsExists = false;
      for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
          const currentCell = newCells[row][col];
          if (
            currentCell.value !== CellValue.bomb &&
            currentCell.state === CellState.closed
          ) {
            safeOpenCellsExists = true;
            break;
          }
        }
      }

      if (!safeOpenCellsExists) {
        newCells = newCells.map((row) =>
          row.map((cell) => {
            if (
              cell.state === CellState.flag &&
              !(cell.value === CellValue.bomb)
            ) {
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

      setCells(newCells);
    };

  const handleCellContext =
    (yParam: number, xParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      const currentCells = cells.slice();
      const currentCell = cells[yParam][xParam];

      if (currentCell.state === CellState.visible || isWon || isLost) {
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

  useEffect(() => {
    if (isLost) {
      setIsLive(false);
      setFace(Face.death);
    }
  }, [isLost]);

  useEffect(() => {
    if (isWon) {
      setIsLive(false);
      setFace(Face.win);
    }
  }, [isWon]);

  useEffect(() => {
    if (timeCount !== 999 && isLive) {
      const timer = setInterval(() => {
        setTimeCount(timeCount + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeCount, isLive]);

  useEffect(() => {
    setTime(Array.from(timeCount.toString().padStart(3, "0"), Number));
  }, [timeCount]);
  useEffect(() => {
    setBombCount(Array.from(bombFlags.toString().padStart(3, "0"), Number));
  }, [bombFlags]);

  const renderCells = (): React.ReactNode => {
    return cells.map((row, y) => (
      <div key={y} className="cellsRow">
        {row.map((cell, x) => (
          <Button
            onContext={handleCellContext}
            onMouseDown={handleCellMouseDown}
            onMouseUp={handleCellMouseUp}
            onClick={handleCellClick}
            key={`${y}-${x}`}
            x={x}
            y={y}
            value={cell.value}
            state={cell.state}
          ></Button>
        ))}
      </div>
    ));
  };

  return (
    <div className="App bordersOut">
      <div className="header bordersIn">
        <div className="counter">
          <div className={`num-${bombCount[0]}`}></div>
          <div className={`num-${bombCount[1]}`}></div>
          <div className={`num-${bombCount[2]}`}></div>
        </div>
        <div onClick={handleFaceClick} className={`face face-${face}`}></div>
        <div className="counter">
          <div className={`num-${time[0]}`}></div>
          <div className={`num-${time[1]}`}></div>
          <div className={`num-${time[2]}`}></div>
        </div>
      </div>
      <div className="container bordersIn">{renderCells()}</div>
    </div>
  );
}

export default App;

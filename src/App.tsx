import React, { useState, useEffect } from "react";

import "./App.css";
import Button from "./components/Button";
import CellsField from "./components/CellsField";
import DisplayNumber from "./components/DisplayNumber";
import FaceButton from "./components/FaceButton";
import { BOMB_COUNT, SIZE } from "./constants";
import { useGameState } from "./hooks/useGameState";
import { Face, CellState, CellValue, Cell } from "./types";
import {
  createFieldCells,
  openAllAdjacentNullCells,
  showAllBombs,
} from "./utils";

function App() {
  const [cells, setCells] = useState<Cell[][]>(createFieldCells());
  const [timeCount, setTimeCount] = useState<number>(0);
  const [face, setFace] = useState<Face>(Face.smile);
  const [bombFlags, setBombFlags] = useState<number>(BOMB_COUNT);
  const [isLost, setIsLost] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(false);

  //обработчик для клика по лицу
  const handleFaceClick = (): void => {
    setIsLive(false);
    setFace(Face.smile);
    setTimeCount(0);
    setCells(createFieldCells());
    setBombFlags(BOMB_COUNT);
    setIsLost(false);
    setIsWon(false);
  };

  useGameState(isWon, Face.win, setIsLive, setFace);
  useGameState(isLost, Face.death, setIsLive, setFace);

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

  return (
    <div className="App bordersOut">
      <div className="header bordersIn">
        <DisplayNumber value={bombFlags}></DisplayNumber>
        <FaceButton onClick={handleFaceClick} value={face}></FaceButton>
        <DisplayNumber value={timeCount}></DisplayNumber>
      </div>
      <CellsField
        cells={cells}
        setCells={setCells}
        bombFlags={bombFlags}
        isLive={isLive}
        isLost={isLost}
        isWon={isWon}
        setBombFlags={setBombFlags}
        setFace={setFace}
        setIsLive={setIsLive}
        setIsLost={setIsLost}
        setIsWon={setIsWon}
      ></CellsField>
    </div>
  );
}

export default App;

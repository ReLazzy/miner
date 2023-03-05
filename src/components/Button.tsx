import React from "react";
import { CellState, CellValue } from "../types/CellTypes";

import cs from "./Button.module.css";

interface ButtonI {
  onClick(rowParam: number, colParam: number): () => void;
  onContext(
    rowParam: number,
    colParam: number
  ): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseOut(
    rowParam: number,
    colParam: number
  ): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp(
    rowParam: number,
    colParam: number
  ): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown(
    rowParam: number,
    colParam: number
  ): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  x: number;
  y: number;
  value: CellValue;
  state: CellState;
  isDefused?: boolean;
}

const Button = (props: ButtonI) => {
  const {
    onClick,
    onContext,
    onMouseDown,
    onMouseOut,
    onMouseUp,
    x,
    y,
    value,
    state,
  } = props;
  const arrayModules =
    state === CellState.visible
      ? [cs.button, cs[`value-${value}`]]
      : [cs.button, cs[`state-${state}`]];

  return (
    <div
      onMouseDown={onMouseDown(y, x)}
      onMouseUp={onMouseUp(y, x)}
      onMouseOut={onMouseOut(y, x)}
      onClick={onClick(y, x)}
      onContextMenu={onContext(y, x)}
      className={arrayModules.join(" ")}
    />
  );
};

export default Button;

import React from "react";
import { CellState, CellValue } from "../types";
import cs from "./Button.module.css";

interface ButtonI {
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
  onMouseUp(rowParam: number, colParam: number): (...args: any[]) => void;
  onMouseDown(rowParam: number, colParam: number): (...args: any[]) => void;
  x: number;
  y: number;
  value: CellValue;
  state: CellState;
  isDefused?: boolean;
}

const Button: React.FC<ButtonI> = ({
  onClick,
  onContext,
  onMouseDown,
  onMouseUp,
  x,
  y,
  value,
  state,
}) => {
  const arrayModules =
    state === CellState.visible
      ? [cs.button, cs[`value-${value}`]]
      : [cs.button, cs[`state-${state}`]];

  return (
    <div
      onMouseDown={onMouseDown(y, x)}
      onMouseUp={onMouseUp(y, x)}
      onClick={onClick(y, x)}
      onContextMenu={onContext(y, x)}
      className={arrayModules.join(" ")}
    ></div>
  );
};

export default Button;

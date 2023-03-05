export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
  detected,
  defused,
}

export interface AdjacentCellsI {
  topLeftCell: Cell | null;
  topCell: Cell | null;
  topRightCell: Cell | null;
  leftCell: Cell | null;
  rightCell: Cell | null;
  bottomLeftCell: Cell | null;
  bottomCell: Cell | null;
  bottomRightCell: Cell | null;
}

export enum CellState {
  closed,
  pressed,
  flag,
  question,
  visible,
}
export enum Face {
  smile,
  fear,
  win,
  death,
}
export interface Cell {
  value: CellValue;
  state: CellState;
}

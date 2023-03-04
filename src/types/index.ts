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

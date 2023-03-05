export enum CellState {
  closed,
  pressed,
  flag,
  question,
  visible,
}
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
export interface Cell {
  value: CellValue;
  state: CellState;
}

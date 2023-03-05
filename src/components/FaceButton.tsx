import React from "react";
import { Face } from "../types";
import cs from "./FaceButton.module.css";

const cellOffsetX = -27;

interface FaceI {
  onClick(): void;
  value: Face;
}
const FaceButton: React.FC<FaceI> = ({ onClick, value }) => {
  const offsetX = value !== 0 ? (value + 1) * cellOffsetX : 0;
  return (
    <div
      onClick={onClick}
      className={cs.face}
      style={{ backgroundPositionX: offsetX }}
    ></div>
  );
};

export default FaceButton;

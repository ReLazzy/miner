import React from "react";
import { Face } from "../types";
import cs from "./FaceButton.module.css";

interface FaceI {
  onClick(): void;
  value: Face;
}
const FaceButton: React.FC<FaceI> = ({ onClick, value }) => {
  return (
    <div
      onClick={onClick}
      className={[cs.face, cs[`face-${value}`]].join(" ")}
    ></div>
  );
};

export default FaceButton;

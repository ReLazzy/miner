import { useEffect } from "react";
import { Face } from "../types";

export const checkGameState = (
  state: boolean,
  face: Face,
  setGame: React.Dispatch<React.SetStateAction<boolean>>,
  setFace: React.Dispatch<React.SetStateAction<Face>>
): void => {
  useEffect(() => {
    if (state) {
      setGame(false);
      setFace(face);
    }
  }, [state]);
};

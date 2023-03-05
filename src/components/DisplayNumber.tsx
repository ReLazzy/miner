import React, { useEffect, useState } from "react";
import cs from "./DisplayNumber.module.css";

const cellOffsetX = -14;
const noneOffset = -126;

interface DisplayNumberI {
  value: number;
}

const DisplayNumber: React.FC<DisplayNumberI> = ({ value }) => {
  const [arrayNumber, setArrayNumber] = useState<number[]>([]);

  useEffect(() => {
    const valArray = Array.from(value.toString().padStart(3, "0"), Number);
    setArrayNumber(valArray);
  }, [value]);
  return (
    <div className={cs.counter}>
      {arrayNumber.map((number, i) => {
        const offsetX = number !== 0 ? (number - 1) * cellOffsetX : noneOffset;

        return (
          <div
            key={i}
            className={cs.num}
            style={{ backgroundPositionX: offsetX }}
          />
        );
      })}
    </div>
  );
};

export default DisplayNumber;

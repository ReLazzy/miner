import React, { useEffect, useState } from "react";
import cs from "./DisplayNumber.module.css";

interface DisplayNumberI {
  value: number;
}

const DisplayNumber: React.FC<DisplayNumberI> = ({ value }) => {
  const [arrayNumber, setArrayNumber] = useState<number[]>([]);
  useEffect(() => {
    setArrayNumber(Array.from(value.toString().padStart(3, "0"), Number));
  }, [value]);
  return (
    <div className={cs.counter}>
      {arrayNumber.map((number, i) => (
        <div key={i} className={[cs.num, cs[`num-${number}`]].join(" ")}></div>
      ))}
    </div>
  );
};

export default DisplayNumber;

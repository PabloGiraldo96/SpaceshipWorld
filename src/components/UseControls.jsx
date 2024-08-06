import { useState, useEffect } from "react";

const keyMap = {
  ArrowUp: "forward",
  KeyW: "forward",
  ArrowDown: "back",
  KeyS: "back",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  KeyX: "down",
  Space: "jump",
};

export const useControls = () => {
  const [controls, setControls] = useState({
    forward: false,
    back: false,
    left: false,
    right: false,
    jump: false,
    down: false,
  });
  //  console.log(controls);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keyMap[e.code]) {
        setControls((prev) => ({ ...prev, [keyMap[e.code]]: true }));
      }
    };

    const handleKeyUp = (e) => {
      if (keyMap[e.code]) {
        setControls((prev) => ({ ...prev, [keyMap[e.code]]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return controls;
};

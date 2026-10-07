import { useEffect, useState } from "react";
import { touchState } from "./touchState";

const btnStyle = {
  width: 64,
  height: 64,
  borderRadius: "50%",
  border: "2px solid rgba(255,255,255,0.6)",
  background: "rgba(0,0,0,0.35)",
  color: "#fff",
  fontSize: 24,
  touchAction: "none",
  userSelect: "none",
  WebkitUserSelect: "none",
};

function Btn({ label, action }) {
  const set = (value) => (e) => {
    e.preventDefault();
    touchState[action] = value;
  };
  return (
    <button
      style={btnStyle}
      onPointerDown={set(true)}
      onPointerUp={set(false)}
      onPointerLeave={set(false)}
      onPointerCancel={set(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
    </button>
  );
}

export default function TouchControls() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (!show) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }}>
      <div style={{ position: "absolute", left: 20, bottom: 20, display: "flex", gap: 12, pointerEvents: "auto" }}>
        <Btn label="◀" action="left" />
        <Btn label="▶" action="right" />
      </div>
      <div style={{ position: "absolute", right: 20, bottom: 20, display: "flex", flexDirection: "column", gap: 12, pointerEvents: "auto" }}>
        <Btn label="▲" action="forward" />
        <Btn label="▼" action="backward" />
      </div>
    </div>
  );
}
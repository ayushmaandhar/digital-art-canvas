import React from "react";
import { useCanvasContext } from "../context/CanvasContext";

const styles = [
  { label: "Solid", value: "solid" },
  { label: "Dotted", value: "dotted" },
  { label: "Glow", value: "glow" },
];

const BrushStylePicker = ({ onClose }) => {
  const { brushStyle, setBrushStyle } = useCanvasContext();

  const handleClick = (value) => {
    setBrushStyle(value);
    if (onClose) onClose();
  };

  return (
    <div
      className="brush-style-picker flex flex-col gap-2 bg-white p-2 rounded-xl shadow-md border border-gray-200 w-24"
      style={{ cursor: "default" }}
    >
      {styles.map((style) => (
        <button
          key={style.value}
          onClick={() => handleClick(style.value)}
          className={`text-sm px-2 py-1 rounded-md transition-all duration-150 cursor-pointer ${
            brushStyle === style.value
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {style.label}
        </button>
      ))}
    </div>
  );
};

export default BrushStylePicker;

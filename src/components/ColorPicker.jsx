import React from "react";
import { HexColorPicker } from "react-colorful";
import { useCanvasContext } from "../context/CanvasContext";

// 10 sample swatches
const swatches = [
  "#000000", "#ff0000", "#ffa500", "#ffff00", "#00ff00",
  "#00ffff", "#0000ff", "#800080", "#ff69b4", "#ffffff"
];

const ColorPicker = ({ onClose }) => {
  const { color, setColor } = useCanvasContext();

  const handleChange = (newColor) => {
    setColor(newColor);
  };

  const handleSwatchClick = (hex) => {
    console.log("🎯 Selected color:", hex);
    setColor(hex);
    if (onClose) onClose();
  };

  return (
    <div
      className="color-picker flex flex-col items-center gap-3 p-3 bg-white rounded-2xl shadow-xl border border-gray-200 w-56 z-50"
      style={{ cursor: "default" }}
    >
      <div className="grid grid-cols-5 gap-2">
        {swatches.map((swatch) => (
          <button
            key={swatch}
            onClick={() => handleSwatchClick(swatch)}
            className={`w-6 h-6 rounded-full border-2 transition-transform duration-100 cursor-pointer ${
              color.toLowerCase() === swatch.toLowerCase()
                ? "border-black scale-110"
                : "border-gray-300"
            }`}
            style={{
              backgroundColor: swatch,
              backgroundImage:
                swatch === "#ffffff"
                  ? "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)"
                  : "none",
              backgroundSize: "6px 6px",
              backgroundPosition: "0 0, 3px 3px"
            }}
            title={swatch}
          />
        ))}
      </div>

      <div className="w-full">
        <HexColorPicker
          color={color}
          onChange={handleChange}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;

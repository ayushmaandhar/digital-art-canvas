import React from "react";
import { HexColorPicker } from "react-colorful";
import { useCanvasContext } from "../context/CanvasContext";

const swatches = [
  "#000000", "#ffffff", "#ff0000", "#ffa500", "#ffff00",
  "#00ff00", "#00ffff", "#0000ff", "#800080", "#ff69b4",
];

const ColorPicker = () => {
  const { color, setColor } = useCanvasContext();

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl shadow-xl border border-gray-200 w-56">
      {/* Swatches */}
      <div className="grid grid-cols-5 gap-2">
        {swatches.map((swatch) => (
          <button
            key={swatch}
            onClick={() => setColor(swatch)}
            className={`w-6 h-6 rounded-full border-2 transition-transform duration-100 ${
              color.toLowerCase() === swatch.toLowerCase()
                ? "border-black scale-110"
                : "border-gray-300"
            } ${
              swatch === "#ffffff" ? "bg-white shadow-inner" : ""
            }`}
            style={{
              backgroundColor: swatch,
              backgroundImage:
                swatch === "#ffffff"
                  ? "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)"
                  : "none",
              backgroundSize: "6px 6px",
              backgroundPosition: "0 0, 3px 3px",
            }}
            title={swatch}
          />
        ))}
      </div>

      {/* Fully Visible Color Picker */}
      <div className="w-full h-[220px] overflow-hidden rounded-xl">
        <HexColorPicker
          color={color}
          onChange={setColor}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default ColorPicker;

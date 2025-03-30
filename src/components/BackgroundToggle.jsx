import React from "react";
import { useCanvasContext } from "../context/CanvasContext";

const BackgroundToggle = ({ onClose }) => {
  const { bgTheme, setBgTheme } = useCanvasContext();

  const themes = [
    { label: "Daylight", value: "daylight", color: "bg-yellow-100" },
    { label: "Dusk", value: "dusk", color: "bg-purple-200" },
    { label: "Night", value: "night", color: "bg-gray-800 text-white" },
  ];

  return (
    <div className="p-3 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col gap-2 w-40">
      {themes.map((theme) => (
        <button
          key={theme.value}
          className={`w-full text-left px-3 py-2 rounded-md hover:bg-indigo-100 transition ${theme.color}`}
          onClick={() => {
            setBgTheme(theme.value);
            if (onClose) onClose();
          }}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
};

export default BackgroundToggle;

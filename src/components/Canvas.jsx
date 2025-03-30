import React from "react";
import useCanvas from "../hooks/useCanvas";
import { useCanvasContext } from "../context/CanvasContext";

const Canvas = ({ onCanvasClick }) => {
  const { canvasRef, bgTheme } = useCanvasContext();
  const { startDrawing, draw, stopDrawing } = useCanvas(canvasRef);

  const handleMouseDown = (e) => {
    if (onCanvasClick) onCanvasClick(); // closes submenus
    startDrawing(e);
  };

  const themeBackgrounds = {
    daylight: "linear-gradient(to bottom right, #fdf6e3, #fefefe)",
    dusk: "linear-gradient(to bottom right, #fbc2eb, #a6c1ee)",
    night: "linear-gradient(to bottom right, #1a1a2e, #16213e)",
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden transition-colors duration-300"
      style={{
        background: themeBackgrounds[bgTheme] || themeBackgrounds.daylight,
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="absolute top-0 left-0 w-full h-full touch-none cursor-crosshair z-10"
      />
    </div>
  );
};

export default Canvas;

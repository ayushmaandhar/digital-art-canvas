import React from "react";
import useCanvas from "../hooks/useCanvas";
import { useCanvasContext } from "../context/CanvasContext";

const Canvas = () => {
  const { canvasRef, tool, color, size } = useCanvasContext();
  const { startDrawing, draw, stopDrawing } = useCanvas(canvasRef, tool, color, size);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      className="w-full h-full touch-none cursor-crosshair"
    />
  );
};

export default Canvas;

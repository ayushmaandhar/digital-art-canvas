import { useEffect, useRef, useState } from "react";
import { useCanvasContext } from "../context/CanvasContext";

const useCanvas = (canvasRef, tool, color, size) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const ctxRef = useRef(null);
  const { saveState } = useCanvasContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = size;
    ctx.strokeStyle = color;

    ctxRef.current = ctx;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    saveState(); // Save the blank canvas on load
  }, [canvasRef]);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctxRef.current.lineWidth = size;
    }
  }, [tool, color, size]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      ctxRef.current.closePath();
      setIsDrawing(false);
      saveState();
    }
  };

  return {
    startDrawing,
    draw,
    stopDrawing,
  };
};

export default useCanvas;
